create extension if not exists pgcrypto;

create type public.plan_tier as enum ('free', 'pro');
create type public.usage_status as enum ('in_progress', 'completed', 'failed', 'blocked');

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  plan public.plan_tier not null default 'free',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  input_prompt text not null,
  generated_prompt text not null,
  is_favorite boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  prompt_id uuid references public.prompts (id) on delete set null,
  ip text not null,
  fingerprint text not null,
  user_agent text,
  status public.usage_status not null default 'in_progress',
  failure_reason text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text not null unique,
  status text not null,
  plan public.plan_tier not null default 'pro',
  current_period_end timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists prompts_user_id_created_at_idx on public.prompts (user_id, created_at desc);
create index if not exists prompts_user_id_favorite_idx on public.prompts (user_id, is_favorite);
create index if not exists usage_logs_user_id_created_at_idx on public.usage_logs (user_id, created_at desc);
create index if not exists usage_logs_ip_created_at_idx on public.usage_logs (ip, created_at desc);
create index if not exists usage_logs_fingerprint_created_at_idx on public.usage_logs (fingerprint, created_at desc);
create index if not exists subscriptions_user_id_created_at_idx on public.subscriptions (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update
  set email = excluded.email;

  return new;
end;
$$;

create or replace function public.handle_updated_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.users
  set email = coalesce(new.email, old.email),
      updated_at = timezone('utc', now())
  where id = new.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email on auth.users
  for each row execute procedure public.handle_updated_auth_user();

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.prompts enable row level security;
alter table public.usage_logs enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "Users can view their own profile" on public.users;
create policy "Users can view their own profile"
  on public.users
  for select
  using (auth.uid() = id);

drop policy if exists "Users can view their own prompts" on public.prompts;
create policy "Users can view their own prompts"
  on public.prompts
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own prompts" on public.prompts;
create policy "Users can update their own prompts"
  on public.prompts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can view their own usage logs" on public.usage_logs;
create policy "Users can view their own usage logs"
  on public.usage_logs
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can view their own subscriptions" on public.subscriptions;
create policy "Users can view their own subscriptions"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

create or replace function public.begin_prompt_generation(
  p_user_id uuid,
  p_ip text,
  p_fingerprint text,
  p_user_agent text default null
)
returns table (
  allowed boolean,
  log_id uuid,
  plan public.plan_tier,
  used_today integer,
  daily_limit integer,
  reason text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan public.plan_tier;
  v_day_start timestamptz;
  v_used_today integer := 0;
  v_ip_hourly integer := 0;
  v_ip_daily integer := 0;
  v_fingerprint_accounts integer := 0;
  v_log_id uuid;
  v_daily_limit integer := 10;
  v_reason text;
begin
  select date_trunc('day', now() at time zone 'utc') at time zone 'utc' into v_day_start;

  perform pg_advisory_xact_lock(hashtext(p_user_id::text || ':' || v_day_start::text));

  select u.plan into v_plan
  from public.users u
  where u.id = p_user_id;

  if v_plan is null then
    raise exception 'User profile not found for %', p_user_id;
  end if;

  if v_plan = 'pro' then
    v_daily_limit := null;
  end if;

  select count(*)
  into v_used_today
  from public.usage_logs ul
  where ul.user_id = p_user_id
    and ul.created_at >= v_day_start
    and (
      ul.status = 'completed'
      or (ul.status = 'in_progress' and ul.created_at >= now() - interval '15 minutes')
    );

  select count(*)
  into v_ip_hourly
  from public.usage_logs ul
  where ul.ip = p_ip
    and ul.created_at >= now() - interval '1 hour'
    and ul.status in ('completed', 'in_progress');

  select count(*)
  into v_ip_daily
  from public.usage_logs ul
  where ul.ip = p_ip
    and ul.created_at >= v_day_start
    and ul.status in ('completed', 'in_progress');

  select count(distinct ul.user_id)
  into v_fingerprint_accounts
  from public.usage_logs ul
  where ul.fingerprint = p_fingerprint
    and ul.created_at >= v_day_start;

  if v_plan = 'free' and v_ip_hourly >= 20 then
    v_reason := 'Too many requests from this IP. Please try again later.';
  elsif v_plan = 'free' and v_ip_daily >= 40 then
    v_reason := 'This IP has reached the daily safety threshold.';
  elsif v_plan = 'free' and v_fingerprint_accounts >= 3 then
    v_reason := 'This device has reached the free plan safety threshold.';
  elsif v_plan = 'free' and v_used_today >= 10 then
    v_reason := 'You have reached your 10 prompt upgrades for today.';
  end if;

  if v_reason is not null then
    insert into public.usage_logs (
      user_id,
      ip,
      fingerprint,
      user_agent,
      status,
      failure_reason
    )
    values (
      p_user_id,
      p_ip,
      p_fingerprint,
      p_user_agent,
      'blocked',
      v_reason
    )
    returning id into v_log_id;

    return query
    select false, v_log_id, v_plan, v_used_today, v_daily_limit, v_reason;
    return;
  end if;

  insert into public.usage_logs (
    user_id,
    ip,
    fingerprint,
    user_agent,
    status
  )
  values (
    p_user_id,
    p_ip,
    p_fingerprint,
    p_user_agent,
    'in_progress'
  )
  returning id into v_log_id;

  return query
  select true, v_log_id, v_plan, v_used_today, v_daily_limit, null::text;
end;
$$;

revoke all on function public.begin_prompt_generation(uuid, text, text, text) from public;
grant execute on function public.begin_prompt_generation(uuid, text, text, text) to service_role;
