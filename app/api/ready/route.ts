import { NextResponse } from 'next/server';
import { instagramStatus } from '@/lib/instagram/adapter';
import { billingStatus } from '@/lib/billing/provider';
import { env } from '@/lib/config';

export async function GET() {
  const checks = {
    app: true,
    instagram: instagramStatus().configured,
    database: Boolean(env('DATABASE_URL') || (env('NEXT_PUBLIC_SUPABASE_URL') && env('SUPABASE_SERVICE_ROLE_KEY'))),
    ai: Boolean(env('AI_API_KEY')),
    billing: billingStatus().configured,
  };
  const coreReady = checks.app && checks.instagram && checks.database;
  return NextResponse.json({ status: coreReady ? 'ready' : 'setup_required', checks }, { status: coreReady ? 200 : 503 });
}
