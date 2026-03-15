# Supabase assets

This folder contains:

- SQL migration for the PromptForge AI schema
- Optional Supabase Edge Function for Stripe webhook handling

## Apply the migration

Run the SQL in:

- `supabase/migrations/20260315193000_promptforge_schema.sql`

## Deploy the optional Stripe webhook function

```bash
supabase functions deploy stripe-webhook --no-verify-jwt
```

Required secrets:

```bash
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```
