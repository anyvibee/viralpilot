import { NextResponse } from 'next/server';
import { billingStatus } from '@/lib/billing/provider';

export async function GET() {
  const status = billingStatus();
  return NextResponse.json({ ...status, message: status.configured ? 'Checkout is configured.' : 'Billing provider is not configured yet.' });
}
