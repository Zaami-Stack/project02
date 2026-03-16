# Winklow

Winklow is a production-ready SaaS app that upgrades simple prompts into premium, structured prompts for modern AI models.

This version uses:
- No account system
- Free mode for everyone (10 prompts/day)
- Pro unlock via private access codes
- PayPal payment link (`paypal.me/AnasZaami`)

## Stack

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn-style UI
- Supabase Postgres (service-role backend usage)
- Built-in local prompt intelligence engine (no external AI API required)
- Vercel deployment

## Main flow

1. User opens `/dashboard` directly.
2. User gets free mode automatically.
3. User enters a prompt and gets premium output.
4. If user buys Pro, they receive a private code from you.
5. User redeems code in dashboard and gets unlimited usage on that device.

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

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
```

Notes:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is kept for compatibility, but this app uses secure server routes for DB writes.
- `SUPABASE_SERVICE_ROLE` must never be exposed client-side.
- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` must look like `ca-pub-xxxxxxxxxxxxxxxx`.
- Ad slots are optional; if slot IDs are empty, ad blocks won't render.

## Local development

```bash
npm install
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Open SQL editor and run:
   - `supabase/migrations/20260315193000_promptforge_schema.sql`
   - `supabase/migrations/20260316000500_fix_hash_access_code_search_path.sql`
3. Confirm tables exist:
   - `access_codes`
   - `access_sessions`
   - `prompts`
   - `usage_logs`
4. Confirm functions exist:
   - `hash_access_code`
   - `claim_access_code`
   - `begin_prompt_generation`

## Create Pro access codes

Run SQL like this in Supabase:

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

Tips:
- Set `max_activations = 1` for one-device code.
- Leave it `null` for reusable code.
- Disable any code with `is_active = false`.

## PayPal flow

- Public payment link is in code: `https://paypal.me/AnasZaami`
- After payment, you manually send the private code.
- User redeems code in dashboard.

## Google AdSense setup

1. Create/approve your AdSense account.
2. Get your publisher ID (`ca-pub-...`) and ad slot IDs.
3. Set:
   - `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP`
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE`
4. Redeploy on Vercel.
5. Verify ads appear on the landing page.

## Security model

- Free limit is enforced server-side in Postgres function `begin_prompt_generation`
- Access codes are hashed in DB (`sha256`)
- Pro session uses secure HTTP-only cookie token
- Usage tracking includes IP + fingerprint + access session id
- No client-side trust for plan upgrades

## Deploy to Vercel

1. Push repo to GitHub.
2. Import repo in Vercel.
3. Add env vars above.
4. Deploy.
5. Set `NEXT_PUBLIC_APP_URL` to your production domain (for example `https://project02.vercel.app`).

## Google indexing checklist (Winklow)

To improve discovery when people search `Winklow`:

1. In Vercel, set:
   - `NEXT_PUBLIC_APP_URL=https://winklow.vercel.app`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token from Search Console>`
2. In Google Search Console, add property `https://winklow.vercel.app`.
3. Verify ownership with the HTML meta tag method (the env var above).
4. Submit sitemap: `https://winklow.vercel.app/sitemap.xml`.
5. Run URL Inspection on:
   - `https://winklow.vercel.app/`
   - `https://winklow.vercel.app/contact`
6. Click "Request indexing" and wait for crawl processing.

Notes:
- Indexing is not instant; Google usually takes from a few hours to several days.
- Ranking position is never guaranteed, but these are the core production SEO requirements.

## Routes

- `GET /dashboard` -> main app
- `POST /api/prompts` -> generate premium prompt
- `GET /api/prompts/history` -> load history by fingerprint/session
- `PATCH /api/prompts/[id]/favorite` -> toggle favorites
- `GET /api/access/status` -> free/pro status
- `POST /api/access/redeem` -> redeem private code
- `POST /api/access/revoke` -> remove Pro from current device
