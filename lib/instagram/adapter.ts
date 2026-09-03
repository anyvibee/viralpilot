import { env, publicAppUrl } from '../config';

export type InstagramProfile = {
  id: string;
  username: string;
  accountType?: string;
  followers?: number;
  mediaCount?: number;
};

export type InstagramInsights = {
  reach?: number;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  raw?: unknown;
};

export type InstagramAdapterStatus = {
  configured: boolean;
  missing: string[];
  redirectUri: string;
};

export function instagramStatus(): InstagramAdapterStatus {
  const required = ['META_APP_ID', 'META_APP_SECRET', 'META_REDIRECT_URI'];
  const missing = required.filter((key) => !env(key));
  return { configured: missing.length === 0, missing, redirectUri: env('META_REDIRECT_URI') || `${publicAppUrl()}/api/instagram/callback` };
}

export function getInstagramAuthorizationUrl(state: string) {
  const base = env('META_AUTH_URL');
  const clientId = env('META_APP_ID');
  const redirectUri = env('META_REDIRECT_URI') || `${publicAppUrl()}/api/instagram/callback`;
  if (!base || !clientId) return null;
  const url = new URL(base);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);
  const scope = env('META_SCOPE');
  if (scope) url.searchParams.set('scope', scope);
  return url.toString();
}

export async function exchangeCodeForToken(code: string) {
  const tokenUrl = env('META_TOKEN_URL');
  const clientId = env('META_APP_ID');
  const clientSecret = env('META_APP_SECRET');
  const redirectUri = env('META_REDIRECT_URI') || `${publicAppUrl()}/api/instagram/callback`;
  if (!tokenUrl || !clientId || !clientSecret) throw new Error('Instagram OAuth is not configured.');

  const body = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, code });
  const response = await fetch(tokenUrl, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body, cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Instagram token exchange failed (${response.status}).`);
  return data as { access_token?: string; user_id?: string; expires_in?: number };
}
