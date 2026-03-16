# Supabase assets

This folder contains the Winklow SQL migration for the no-account + access-code model.

## Apply migration

Run:
- `supabase/migrations/20260315193000_promptforge_schema.sql`
- `supabase/migrations/20260316000500_fix_hash_access_code_search_path.sql`

## Tables created

- `access_codes`
- `access_sessions`
- `prompts`
- `usage_logs`

## Functions created

- `hash_access_code(text)`
- `claim_access_code(text, text, text, text, text)`
- `begin_prompt_generation(text, text, text, text)`

## Example: create a Pro code

```sql
insert into public.access_codes (
  code_hash,
  code_label,
  max_activations
)
values (
  public.hash_access_code('ANAS-PRO-001'),
  'Customer 001',
  1
);
```
