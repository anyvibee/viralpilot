'use client'
import { useState } from 'react'
import { ArrowRight, BarChart3, CheckCircle2, ChevronDown, Instagram, Play, Sparkles, Target, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

const features = [
  { icon: BarChart3, title: 'Deep Analytics', text: 'See which formats, themes and hooks are actually driving reach.' },
  { icon: Sparkles, title: 'AI Growth Plan', text: 'Turn your account data into practical ideas, hooks and weekly actions.' },
  { icon: Target, title: 'Content Scoring', text: 'Score every idea for hook strength, shareability and growth potential.' },
]

export default function Home() {
  const [input, setInput] = useState('')
  const router = useRouter()
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (input.trim()) router.push(`/analyze?u=${encodeURIComponent(input)}`) }
  return <main className="min-h-screen bg-[#070712] text-white">
    <section className="relative overflow-hidden grid-bg">
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-[560px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-600/30">V</span>ViralPilot</a>
        <div className="hidden items-center gap-8 text-sm text-white/65 md:flex"><a href="#features" className="hover:text-white">Features</a><a href="#how" className="hover:text-white">How it works</a><a href="/pricing" className="hover:text-white">Pricing</a></div>
        <div className="flex items-center gap-3"><a href="/login" className="hidden rounded-xl border border-white/15 px-4 py-2.5 text-sm md:block">Sign in</a><a href="#analyze" className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black">Start free</a></div>
      </nav>
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-200"><Sparkles size={15}/> AI-powered Instagram Growth OS</div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-.04em] md:text-7xl">Stop guessing.<br/><span className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-pink-300 bg-clip-text text-transparent">Start growing.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">Analyze your Instagram, discover what works, and get a personalized content strategy designed to grow reach, views and followers organically.</p>
          <form id="analyze" onSubmit={submit} className="mt-9 flex max-w-2xl rounded-2xl border border-white/10 bg-white p-1.5 shadow-2xl shadow-violet-950/50">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-4 text-black"><Instagram size={20} className="shrink-0 text-fuchsia-500"/><input aria-label="Instagram username" value={input} onChange={e=>setInput(e.target.value)} placeholder="@username or Instagram link" className="w-full bg-transparent py-3.5 outline-none"/></div>
            <button className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3.5 font-semibold shadow-lg shadow-violet-600/20">Analyze <ArrowRight className="ml-1 inline" size={17}/></button>
          </form>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45"><span><CheckCircle2 size={14} className="mr-1.5 inline text-emerald-400"/>Free first analysis</span><span><CheckCircle2 size={14} className="mr-1.5 inline text-emerald-400"/>Organic growth</span><span><CheckCircle2 size={14} className="mr-1.5 inline text-emerald-400"/>No fake engagement</span></div>
          <div className="mt-10 flex items-center gap-4 text-sm text-white/45"><div className="flex -space-x-2">{['O','A','M','S','N'].map((x,i)=><div key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#070712] bg-gradient-to-br from-violet-400 to-fuchsia-400 text-xs font-bold text-white">{x}</div>)}</div><span>Built for creators, brands & agencies</span></div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-violet-600/15 to-fuchsia-600/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl"><img src="/viralpilot-ui.png" alt="ViralPilot product dashboard" className="w-full rounded-[24px] object-cover"/></div>
          <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/10 bg-[#11111f]/90 p-4 shadow-2xl backdrop-blur-xl sm:block"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400"><Zap size={19}/></div><div><p className="text-xs text-white/45">Growth score</p><p className="text-lg font-bold">84 <span className="text-xs font-normal text-emerald-400">+12%</span></p></div></div></div>
        </div>
      </div>
    </section>
    <section id="features" className="bg-white px-6 py-24 text-black"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-violet-600">Everything in one place</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Your Instagram, decoded.</h2><p className="mt-4 text-lg leading-8 text-black/55">From raw performance data to the next Reel you should publish.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({icon:Icon,title,text})=><div key={title} className="rounded-3xl border border-black/10 bg-[#fafafd] p-7 transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Icon size={22}/></div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-black/55">{text}</p></div>)}</div></div></section>
    <section id="how" className="bg-[#f7f7fb] px-6 py-24 text-black"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.2em] text-violet-600">How it works</p><h2 className="mt-3 text-4xl font-black tracking-tight">From username to growth plan in minutes.</h2></div><div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">{[['01','Enter your account','Paste your @username or Instagram profile link.'],['02','Get your diagnosis','ViralPilot turns your content patterns into clear scores and insights.'],['03','Execute the plan','Get hooks, ideas and a weekly content plan tailored to you.']].map(([n,t,d])=><div key={n} className="relative rounded-3xl bg-white p-7 shadow-sm"><span className="text-sm font-black text-violet-600">{n}</span><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 leading-7 text-black/55">{d}</p></div>)}</div></div></section>
    <section id="pricing" className="bg-white px-6 py-24 text-black"><div className="mx-auto max-w-5xl rounded-[32px] border border-black/10 bg-[#0b0b16] p-8 text-white md:p-12"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-violet-300">Early access</p><h2 className="mt-3 text-3xl font-black">Start free. Upgrade when you need more.</h2><p className="mt-3 max-w-xl text-white/55">Launch pricing will be simple: a useful free analysis, then deeper analytics and AI workflows for serious creators.</p></div><a href="#analyze" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-black">Analyze my account <ArrowRight className="ml-2" size={17}/></a></div></div></section>
    <footer className="border-t border-black/10 bg-white px-6 py-8 text-sm text-black/45"><div className="mx-auto flex max-w-7xl justify-between"><span>© 2026 ViralPilot</span><span>AI-powered organic growth</span></div></footer>
  </main>
}
