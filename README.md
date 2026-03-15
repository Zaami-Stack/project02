# PromptForge AI

PromptForge AI is a production-ready SaaS web app that upgrades a short prompt into a premium, structured prompt optimized for modern AI systems.

## What it includes

- Next.js 14 App Router + TypeScript
- Tailwind CSS + shadcn-style UI primitives
- Supabase Auth, Postgres, RLS, and SQL migration
- Secure server-side prompt generation with OpenAI
- Stripe subscription checkout, portal, and webhook sync
- Free tier daily limits with IP + fingerprint abuse protection
- Prompt history, favorites, copy actions, loading states, and dark mode
- Vercel-ready deployment flow

## Core product flow

1. User signs up with Supabase Auth.
2. User enters a simple prompt in the dashboard.
3. The backend validates the request and checks secure usage limits in Postgres.
4. OpenAI returns an upgraded premium prompt.
5. The generated prompt is stored in Supabase and shown in history.
6. Free users are capped at 10 prompt upgrades per UTC day.
7. Pro users upgrade through Stripe and receive unlimited generations.

## Tech stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS
- UI: shadcn-style components, Framer Motion, Sonner, Zustand
- Backend: Supabase Auth, Supabase Postgres, Supabase RLS
- AI: OpenAI API
- Billing: Stripe subscriptions
- Deployment: Vercel

## Project structure

```text
app/
components/
hooks/
lib/
utils/
api/
styles/
supabase/
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Enable email/password authentication in Supabase Auth.
3. Run the SQL migration in [`supabase/migrations/20260315193000_promptforge_schema.sql`](./supabase/migrations/20260315193000_promptforge_schema.sql).
4. Confirm the following tables exist:
   - `users`
   - `prompts`
   - `usage_logs`
   - `subscriptions`
5. Confirm the `begin_prompt_generation` function exists.
6. Confirm Row Level Security is enabled on the app tables.

### Migration options

- Supabase SQL Editor: paste the migration SQL and run it
- Supabase CLI:

```bash
supabase db push
```

## Stripe setup

1. Create a Stripe product for PromptForge Pro at `$10/month`.
2. Copy the recurring price ID into `STRIPE_PRO_PRICE_ID`.
3. Add a webhook endpoint:
   - Default Vercel route: `https://your-domain.com/api/stripe/webhook`
   - Optional Supabase Edge Function: `https://<project-ref>.functions.supabase.co/stripe-webhook`
4. Subscribe the webhook to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Supabase Edge Function option

An optional Stripe webhook handler is included at [`supabase/functions/stripe-webhook/index.ts`](./supabase/functions/stripe-webhook/index.ts).

Deploy it with:

```bash
supabase functions deploy stripe-webhook --no-verify-jwt
```

Set these Supabase function secrets:

```bash
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

## OpenAI setup

1. Create an OpenAI API key.
2. Add it to `OPENAI_API_KEY`.
3. Optionally override `OPENAI_MODEL` if you want a different compatible model.

## Usage limit and abuse protection

Free plan protections are enforced on the server side:

- 10 successful or in-progress prompt upgrades per UTC day
- IP hourly safety threshold
- IP daily safety threshold
- Browser fingerprint multi-account threshold
- Supabase-backed usage logging
- No client-side trust for plan checks

All prompt attempts are tracked in `usage_logs`, and limits are enforced by the Postgres function `begin_prompt_generation`.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables listed above.
4. Deploy.
5. Configure the Stripe webhook to point to your deployed URL.

## Important implementation notes

- The app uses server route handlers for prompt generation and billing.
- Stripe subscription state is synchronized into Supabase and then mirrored into `users.plan`.
- Prompt history and favorites are stored in the `prompts` table.
- The dashboard is protected with Supabase session middleware.
- The landing page, auth flow, and dashboard all support dark mode.

## Recommended post-deploy follow-ups

- Add email verification templates in Supabase Auth
- Add observability for prompt failures and Stripe webhook retries
- Add analytics dashboards for prompt volume and conversion rate
- Add tests for route handlers and DB functions if you want CI enforcement

