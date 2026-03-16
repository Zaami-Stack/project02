create extension if not exists pgcrypto;

create or replace function public.hash_access_code(p_code text)
returns text
language sql
immutable
set search_path = public, extensions
as $$
  select encode(digest(upper(trim(p_code)), 'sha256'), 'hex');
$$;
