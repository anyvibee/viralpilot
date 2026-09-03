import { NextRequest, NextResponse } from 'next/server';
import { getInstagramAuthorizationUrl, instagramStatus } from '@/lib/instagram/adapter';
import { rateLimit } from '@/lib/rate-limit';
import { createOAuthState, oauthStateCookie, oauthStateTtl } from '@/lib/instagram/oauth-state';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rl = rateLimit(`ig-connect:${ip}`, 10, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const status = instagramStatus();
  if (!status.configured) {
    return NextResponse.json({ ...status, authorizationUrl: null, message: 'Instagram connection is not configured yet.' }, { status: 503 });
  }

  const state = createOAuthState();
  const authorizationUrl = getInstagramAuthorizationUrl(state);
  if (!authorizationUrl) return NextResponse.json({ error: 'OAuth configuration is incomplete.' }, { status: 503 });

  const response = NextResponse.json({ authorizationUrl });
  response.cookies.set(oauthStateCookie, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: oauthStateTtl });
  return response;
}
