# ViralPilot launch checklist

## Can be done now
- Deploy the Next.js app.
- Configure environment variables.
- Create the PostgreSQL/Supabase schema from `supabase/schema.sql`.
- Replace demo analyzer calls with persisted snapshots.

## Requires external setup
1. Create a Meta developer app and configure the official Instagram API/OAuth product.
2. Add the exact production redirect URI from `META_REDIRECT_URI`.
3. Store `META_APP_ID` and `META_APP_SECRET` only server-side.
4. Add an AI provider key only on the server.
5. Add a real auth provider and billing provider before charging users.

## Security rules
- Never request Instagram passwords.
- Never put `META_APP_SECRET` or AI secrets in `NEXT_PUBLIC_*` variables.
- Only display metrics returned by authorized APIs or user-provided data.
- Add rate limiting, consent, deletion, and audit logging before public scale.
