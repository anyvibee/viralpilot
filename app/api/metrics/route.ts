import { NextRequest, NextResponse } from 'next/server';
import { generateGrowthPlan } from '@/lib/ai/provider';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rl = rateLimit(`metrics:${ip}`, 30, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
  const body = await request.json().catch(() => null);
  if (!body?.username || !body?.metrics) return NextResponse.json({ error: 'username and metrics are required.' }, { status: 400 });
  const plan = await generateGrowthPlan({ username: String(body.username), metrics: body.metrics, topContent: body.topContent });
  return NextResponse.json(plan);
}
