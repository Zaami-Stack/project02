create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'plan_tier'
      and n.nspname = 'public'
  ) then
    create type public.plan_tier as enum ('free', 'pro');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'usage_status'
      and n.nspname = 'public'
  ) then
    create type public.usage_status as enum ('in_progress', 'completed', 'failed', 'blocked');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'access_session_status'
      and n.nspname = 'public'
  ) then
    create type public.access_session_status as enum ('active', 'revoked', 'expired');
  end if;
end $$;

create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  code_label text,
  plan public.plan_tier not null default 'pro',
  is_active boolean not null default true,
  max_activations integer,
  activation_count integer not null default 0,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.access_sessions (
  id uuid primary key default gen_random_uuid(),
  access_code_id uuid not null references public.access_codes (id) on delete cascade,
  token_hash text not null unique,
  fingerprint text not null,
  ip text not null,
  user_agent text,
  status public.access_session_status not null default 'active',
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  owner_fingerprint text not null,
  access_session_id uuid references public.access_sessions (id) on delete set null,
  ip text not null,
  input_prompt text not null,
  generated_prompt text not null,
  is_favorite boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  prompt_id uuid references public.prompts (id) on delete set null,
  access_session_id uuid references public.access_sessions (id) on delete set null,
  access_tier public.plan_tier not null default 'free',
  ip text not null,
  fingerprint text not null,
  user_agent text,
  status public.usage_status not null default 'in_progress',
  failure_reason text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.prompts
  add column if not exists owner_fingerprint text;
alter table if exists public.prompts
  add column if not exists access_session_id uuid references public.access_sessions (id) on delete set null;
alter table if exists public.prompts
  add column if not exists ip text;
alter table if exists public.prompts
  alter column user_id drop not null;

update public.prompts
set owner_fingerprint = 'legacy'
where owner_fingerprint is null;

update public.prompts
set ip = '0.0.0.0'
where ip is null;

alter table if exists public.prompts
  alter column owner_fingerprint set not null;
alter table if exists public.prompts
  alter column ip set not null;

alter table if exists public.usage_logs
  add column if not exists access_session_id uuid references public.access_sessions (id) on delete set null;
alter table if exists public.usage_logs
  add column if not exists access_tier public.plan_tier default 'free';
alter table if exists public.usage_logs
  alter column user_id drop not null;

update public.usage_logs
set access_tier = 'free'
where access_tier is null;

alter table if exists public.usage_logs
  alter column access_tier set not null;

create index if not exists access_codes_active_idx on public.access_codes (is_active, expires_at);
create index if not exists access_sessions_token_hash_idx on public.access_sessions (token_hash);
create index if not exists access_sessions_status_idx on public.access_sessions (status, expires_at);
create index if not exists prompts_fingerprint_created_idx on public.prompts (owner_fingerprint, created_at desc);
create index if not exists prompts_access_session_created_idx on public.prompts (access_session_id, created_at desc);
create index if not exists usage_logs_fingerprint_created_idx on public.usage_logs (fingerprint, created_at desc);
create index if not exists usage_logs_ip_created_idx on public.usage_logs (ip, created_at desc);
create index if not exists usage_logs_access_session_created_idx on public.usage_logs (access_session_id, created_at desc);

alter table public.access_codes enable row level security;
alter table public.access_sessions enable row level security;
alter table public.prompts enable row level security;
alter table public.usage_logs enable row level security;

create or replace function public.hash_access_code(p_code text)
returns text
language sql
immutable
as $$
  select encode(digest(upper(trim(p_code)), 'sha256'), 'hex');
$$;

create or replace function public.claim_access_code(
  p_code text,
  p_token_hash text,
  p_ip text,
  p_fingerprint text,
  p_user_agent text default null
)
returns table (
  allowed boolean,
  reason text,
  plan public.plan_tier,
  access_session_id uuid,
  session_expires_at timestamptz,
  code_label text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code public.access_codes;
  v_session_expiry timestamptz := timezone('utc', now()) + interval '30 days';
  v_access_session_id uuid;
begin
  select *
  into v_code
  from public.access_codes
  where code_hash = public.hash_access_code(p_code)
  for update;

  if not found then
    return query select false, 'Invalid code.', 'free'::public.plan_tier, null::uuid, null::timestamptz, null::text;
    return;
  end if;

  if v_code.is_active is false then
    return query select false, 'This code is not active.', v_code.plan, null::uuid, null::timestamptz, v_code.code_label;
    return;
  end if;

  if v_code.expires_at is not null and v_code.expires_at <= timezone('utc', now()) then
    return query select false, 'This code has expired.', v_code.plan, null::uuid, null::timestamptz, v_code.code_label;
    return;
  end if;

  if v_code.max_activations is not null and v_code.activation_count >= v_code.max_activations then
    return query select false, 'This code has reached its activation limit.', v_code.plan, null::uuid, null::timestamptz, v_code.code_label;
    return;
  end if;

  if v_code.expires_at is not null and v_code.expires_at < v_session_expiry then
    v_session_expiry := v_code.expires_at;
  end if;

  insert into public.access_sessions (
    access_code_id,
    token_hash,
    fingerprint,
    ip,
    user_agent,
    status,
    expires_at
  )
  values (
    v_code.id,
    p_token_hash,
    p_fingerprint,
    p_ip,
    p_user_agent,
    'active',
    v_session_expiry
  )
  returning id into v_access_session_id;

  update public.access_codes
  set activation_count = activation_count + 1
  where id = v_code.id;

  return query select true, null::text, v_code.plan, v_access_session_id, v_session_expiry, v_code.code_label;
end;
$$;

create or replace function public.begin_prompt_generation(
  p_ip text,
  p_fingerprint text,
  p_access_token_hash text default null,
  p_user_agent text default null
)
returns table (
  allowed boolean,
  log_id uuid,
  plan public.plan_tier,
  used_today integer,
  daily_limit integer,
  reason text,
  access_session_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan public.plan_tier := 'free';
  v_day_start timestamptz;
  v_used_today integer := 0;
  v_ip_hourly integer := 0;
  v_ip_daily integer := 0;
  v_log_id uuid;
  v_daily_limit integer := 10;
  v_reason text;
  v_access_session_id uuid;
begin
  select date_trunc('day', timezone('utc', now())) into v_day_start;

  if p_access_token_hash is not null then
    select s.id, c.plan
    into v_access_session_id, v_plan
    from public.access_sessions s
    join public.access_codes c on c.id = s.access_code_id
    where s.token_hash = p_access_token_hash
      and s.status = 'active'
      and c.is_active = true
      and (s.expires_at is null or s.expires_at > timezone('utc', now()))
      and (c.expires_at is null or c.expires_at > timezone('utc', now()))
    limit 1;
  end if;

  if v_plan = 'pro' then
    v_daily_limit := null;
  end if;

  perform pg_advisory_xact_lock(hashtext(coalesce(v_access_session_id::text, p_fingerprint) || ':' || v_day_start::text));

  if v_plan = 'pro' and v_access_session_id is not null then
    select count(*)
    into v_used_today
    from public.usage_logs ul
    where ul.access_session_id = v_access_session_id
      and ul.created_at >= v_day_start
      and (
        ul.status = 'completed'
        or (ul.status = 'in_progress' and ul.created_at >= timezone('utc', now()) - interval '15 minutes')
      );
  else
    select count(*)
    into v_used_today
    from public.usage_logs ul
    where ul.fingerprint = p_fingerprint
      and ul.created_at >= v_day_start
      and (
        ul.status = 'completed'
        or (ul.status = 'in_progress' and ul.created_at >= timezone('utc', now()) - interval '15 minutes')
      );
  end if;

  select count(*)
  into v_ip_hourly
  from public.usage_logs ul
  where ul.ip = p_ip
    and ul.created_at >= timezone('utc', now()) - interval '1 hour'
    and ul.status in ('completed', 'in_progress');

  select count(*)
  into v_ip_daily
  from public.usage_logs ul
  where ul.ip = p_ip
    and ul.created_at >= v_day_start
    and ul.status in ('completed', 'in_progress');

  if v_plan = 'free' and v_ip_hourly >= 20 then
    v_reason := 'Too many requests from this IP. Please try again later.';
  elsif v_plan = 'free' and v_ip_daily >= 40 then
    v_reason := 'This IP has reached the daily safety threshold.';
  elsif v_plan = 'free' and v_used_today >= 10 then
    v_reason := 'You have reached your 10 prompt upgrades for today.';
  end if;

  if v_reason is not null then
    insert into public.usage_logs (
      access_session_id,
      access_tier,
      ip,
      fingerprint,
      user_agent,
      status,
      failure_reason
    )
    values (
      v_access_session_id,
      v_plan,
      p_ip,
      p_fingerprint,
      p_user_agent,
      'blocked',
      v_reason
    )
    returning id into v_log_id;

    return query
    select false, v_log_id, v_plan, v_used_today, v_daily_limit, v_reason, v_access_session_id;
    return;
  end if;

  insert into public.usage_logs (
    access_session_id,
    access_tier,
    ip,
    fingerprint,
    user_agent,
    status
  )
  values (
    v_access_session_id,
    v_plan,
    p_ip,
    p_fingerprint,
    p_user_agent,
    'in_progress'
  )
  returning id into v_log_id;

  return query
  select true, v_log_id, v_plan, v_used_today, v_daily_limit, null::text, v_access_session_id;
end;
$$;

revoke all on function public.hash_access_code(text) from public;
revoke all on function public.claim_access_code(text, text, text, text, text) from public;
revoke all on function public.begin_prompt_generation(text, text, text, text) from public;

grant execute on function public.hash_access_code(text) to service_role;
grant execute on function public.claim_access_code(text, text, text, text, text) to service_role;
grant execute on function public.begin_prompt_generation(text, text, text, text) to service_role;
