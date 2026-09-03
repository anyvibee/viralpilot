export function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function requiredEnv(name: string): string {
  const value = env(name);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function publicAppUrl(): string {
  return env('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000';
}
