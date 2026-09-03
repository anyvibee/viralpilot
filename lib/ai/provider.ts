import { env } from '../config';

export type GrowthInput = {
  username: string;
  metrics: Record<string, number | string | undefined>;
  topContent?: Array<Record<string, unknown>>;
};

export type GrowthOutput = {
  summary: string;
  priorities: string[];
  hooks: string[];
  disclaimer?: string;
};

export async function generateGrowthPlan(input: GrowthInput): Promise<GrowthOutput> {
  const apiUrl = env('AI_API_URL');
  const apiKey = env('AI_API_KEY');
  if (!apiUrl || !apiKey) {
    return {
      summary: 'AI provider is not connected yet. The product can still generate rule-based recommendations.',
      priorities: ['Improve the first 2 seconds of Reels', 'Repeat the strongest content themes', 'Test consistent posting windows'],
      hooks: ['Stop scrolling — try this…', '3 things I wish I knew before…', 'The fastest way to improve…'],
      disclaimer: 'Recommendations are rule-based until an AI provider is configured.',
    };
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ task: 'instagram_growth_plan', input }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`AI provider failed (${response.status}).`);
  return response.json();
}
