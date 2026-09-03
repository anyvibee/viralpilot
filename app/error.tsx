'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="max-w-md text-center rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm text-white/50">ViralPilot</p>
        <h1 className="mt-2 text-2xl font-semibold">Something went wrong.</h1>
        <p className="mt-3 text-white/60">Try again. If the problem continues, check the production status page.</p>
        <button onClick={() => reset()} className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black">Try again</button>
      </div>
    </main>
  );
}
