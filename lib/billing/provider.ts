import { env } from '../config';

export function billingStatus() {
  return { configured: Boolean(env('BILLING_CHECKOUT_URL')), checkoutUrl: env('BILLING_CHECKOUT_URL') || null };
}
