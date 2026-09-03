import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/instagram/adapter';
import { oauthStateCookie, verifyOAuthState } from '@/lib/instagram/oauth-state';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error');
  const cookieState = request.cookies.get(oauthStateCookie)?.value;

  if (error) return NextResponse.redirect(new URL(`/settings?instagram_error=${encodeURIComponent(error)}`, request.url));
  if (!code || !state || !cookieState || state !== cookieState || !verifyOAuthState(state)) {
    return NextResponse.redirect(new URL('/settings?instagram_error=invalid_oauth_state', request.url));
  }

  try {
    const token = await exchangeCodeForToken(code);
    // Production TODO: persist the token encrypted server-side, tied to the authenticated user.
    const response = NextResponse.redirect(new URL(`/settings?instagram_connected=${token.user_id ? '1' : '0'}`, request.url));
    response.cookies.delete(oauthStateCookie);
    return response;
  } catch {
    return NextResponse.redirect(new URL('/settings?instagram_error=oauth_exchange_failed', request.url));
  }
}
