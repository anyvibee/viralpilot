import { createHmac, timingSafeEqual } from 'crypto';
import { env } from '@/lib/config';

const COOKIE = 'vp_oauth_state';
const TTL_SECONDS = 600;

function secret() {
  return env('OAUTH_STATE_SECRET') || env('META_APP_SECRET') || 'development-only-change-me';
}

export function createOAuthState() {
  const nonce = crypto.randomUUID();
  const payload = `${nonce}.${Date.now()}`;
  const sig = createHmac('sha256', secret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyOAuthState(value: string | undefined) {
  if (!value) return false;
  const parts = value.split('.');
  if (parts.length !== 3) return false;
  const [nonce, timestamp, signature] = parts;
  if (!nonce || !/^\d+$/.test(timestamp) || !signature) return false;
  if (Date.now() - Number(timestamp) > TTL_SECONDS * 1000) return false;
  const expected = createHmac('sha256', secret()).update(`${nonce}.${timestamp}`).digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const oauthStateCookie = COOKIE;
export const oauthStateTtl = TTL_SECONDS;
