# ViralPilot production checklist

## Ready in code
- Server-side Instagram OAuth adapter with configurable endpoints.
- OAuth callback that never returns the access token to the browser.
- Rate-limit guards on public API endpoints.
- Supabase REST persistence helper and SQL schema.
- AI provider abstraction with a safe rule-based fallback.
- Billing checkout abstraction.
- Privacy and Terms routes.
- Demo engine remains explicitly separate from production data.

## Still requires owner-controlled external setup
1. Create/configure a Meta developer app and request the exact Instagram permissions that your use case/account type is eligible for.
2. Configure OAuth redirect URI and secrets in the hosting provider's encrypted environment variables.
3. Create a Supabase/Postgres project and run `supabase/schema.sql`.
4. Configure authentication/session provider and replace the login scaffold.
5. Connect an AI provider and set `AI_API_URL`/`AI_API_KEY`.
6. Connect a billing provider and set `BILLING_CHECKOUT_URL`.
7. Add production monitoring, error tracking, backups, and a durable distributed rate limiter.
8. Complete Meta app review/privacy requirements before offering restricted production capabilities publicly.

## Security gates before public launch
- Encrypt OAuth tokens at rest.
- Validate OAuth `state` server-side and bind it to the signed-in user/session.
- Use least-privilege Meta scopes.
- Never request or store Instagram passwords.
- Never claim metrics that were not returned by an authorized API.
- Add deletion/export workflows for user data.
- Add CSRF/session protections and secure cookies.
- Add webhook signature validation if webhooks are introduced.
