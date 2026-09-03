import { env } from '../config';

export function supabaseConfigured() {
  return Boolean(env('SUPABASE_URL') && env('SUPABASE_SERVICE_ROLE_KEY'));
}

export async function supabaseInsert(table: string, row: Record<string, unknown>) {
  const base = env('SUPABASE_URL');
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!base || !key) throw new Error('Supabase is not configured.');
  const response = await fetch(`${base}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row), cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Database insert failed (${response.status}).`);
}
