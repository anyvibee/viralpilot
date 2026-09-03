# ViralPilot — v1.1 Launch Candidate

AI-powered organic Instagram growth SaaS MVP.

## Included
- Premium landing page
- Username / profile URL analyzer
- Analysis report with Growth Score, themes, recommendations and posting tests
- Dashboard
- Pricing
- Settings
- Login + onboarding flow (launch scaffold)
- Server-side analysis API
- AI ideas API scaffold
- Health endpoint: `GET /api/health`
- Responsive mobile-first UI
- Deterministic demo analyzer for safe product testing

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production status
The analyzer is deliberately a demo engine until official Instagram/Meta permissions and credentials are configured. It does not scrape Instagram, request passwords, or fabricate access to private data.

Production adapters should be connected behind the existing API boundary for:
- official Instagram/Meta OAuth
- eligible professional-account insights
- persistent PostgreSQL storage
- secure authentication/session management
- an AI provider
- billing/subscriptions
- rate limiting, audit logging and monitoring

Never put Meta secrets in client-side code and never collect Instagram passwords.

## Routes
- `/` — Landing
- `/login` — Account entry scaffold
- `/onboarding` — Connect/analyze starting point
- `/analyze?u=@username` — Analysis
- `/dashboard` — Dashboard
- `/pricing` — Pricing
- `/settings` — Settings
- `POST /api/analyze` — Analysis API
- `POST /api/ideas` — Content idea API scaffold
- `GET /api/health` — Health check


## V1.2 production foundation
- PostgreSQL/Supabase schema: `supabase/schema.sql`
- Server-side Meta/Instagram OAuth adapter scaffold
- OAuth configuration status endpoint: `/api/instagram/connect`
- AI provider abstraction scaffold
- Privacy and Terms draft pages
- Launch/security checklist: `docs/LAUNCH.md`

## V1.3 production foundation
- Configurable official Meta/Instagram OAuth adapter and callback.
- Rate limiting for public API routes.
- Supabase REST persistence helper.
- AI provider abstraction with safe fallback.
- Billing configuration endpoint.
- Production hardening checklist: `docs/PRODUCTION.md`.

The app is still not a claim of live Instagram access until the owner configures a Meta developer app, approved permissions, OAuth credentials, and production environment variables.


## V1.4 launch hardening
- OAuth state is signed and stored in an HttpOnly cookie with a short TTL.
- Added `/api/ready` for deployment readiness checks.
- Added `robots.txt`, sitemap, and a global error boundary.
- Production OAuth still requires the official Meta app configuration and encrypted server-side token persistence.
