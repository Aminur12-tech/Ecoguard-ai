import { useState } from "react";

const STATS = [
  { label: "Carbon Saved", value: "1,240 Tons", change: "+12.4% this month", icon: "🌿" },
  { label: "Eco-Routes Analyzed", value: "458,200+", change: "Verified by AI", icon: "📊" },
  { label: "Eco-Travelers", value: "15.8k Active", change: "+18% adoption rate", icon: "🌍" },
];

const FEATURES = [
  {
    title: "Real-time Traffic AI",
    description:
      "Dynamic rerouting to avoid congestion and reduce idling in protected areas.",
  },
  {
    title: "Biodiversity Protection",
    description:
      "Routes designed to minimize noise and light disturbance to local wildlife like the One-horned Rhino.",
  },
];

export default function HeroSectionTailwind() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <>
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#18ac7f] font-sans text-white"
      style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
      }}
      >
      <nav className="flex items-center justify-between border-b border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md md:px-10 md:py-[18px] m-4 rounded-2xl ">
        <div className="flex items-center gap-0.5 text-[1.1rem] font-bold tracking-[-0.5px]">
          <span className="text-[0.95rem] font-medium text-white/90">EcoGuard AI</span>
        </div>

        

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 sm:px-4">
            Sign In
          </button>
          <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#0b7a60] transition hover:opacity-90 sm:px-5">
            Get Started
          </button>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-16 text-center md:px-6 md:pb-10 md:pt-[60px]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3.5 py-1.5 text-[0.72rem] font-bold tracking-[0.08em] text-white backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
          28% CO2 REDUCTION CERTIFIED
        </div>

        <h1 className="mb-5 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.1] text-white">
          Smart Eco Routes for
          <br />
          <em className="font-extrabold italic not-italic md:italic">Assam Tourism</em>
        </h1>

        <p className="mb-9 max-w-[500px] text-base leading-7 text-white/85">
          Experience the beauty of the Northeast with AI-powered navigation
          <br className="hidden sm:block" />
          that minimizes your carbon footprint while maximizing your journey.
        </p>

        <div className="mb-8 flex w-full max-w-[580px] flex-col gap-2 rounded-xl bg-white/95 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center sm:gap-0">
          <div className="flex flex-1 items-center gap-2 px-3">
            <span className="text-base">📍</span>
            <input
              type="text"
              placeholder="Guwahati..."
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-transparent py-2 text-sm text-[#333] outline-none placeholder:text-[#aaa]"
            />
          </div>

          <span className="hidden shrink-0 px-1 text-[1.1rem] text-[#aaa] sm:block">→</span>

          <div className="flex flex-1 items-center gap-2 px-3">
            <span className="text-base">📌</span>
            <input
              type="text"
              placeholder="Kaziranga..."
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-transparent py-2 text-sm text-[#333] outline-none placeholder:text-[#aaa]"
            />
          </div>

          <button className="whitespace-nowrap rounded-lg bg-[#1db98a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#17a37a] sm:px-[22px] sm:py-3">
            Optimize Route ⚡
          </button>
        </div>

        <div className="flex flex-col items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.06em] text-white/75 sm:flex-row sm:gap-6">
          <span className="flex items-center gap-1.5">🔬 IEEE RESEARCH</span>
          <span className="flex items-center gap-1.5">🌿 BIODIVERSITY WATCH</span>
          <span className="flex items-center gap-1.5">📡 REAL-TIME TRACKING</span>
        </div>
      </main>

      <div className="animate-bounce pb-4 text-center text-[1.4rem] text-white/50">⌄</div>
    </div>
    <div>
        <div className="min-h-screen bg-slate-100 p-5 flex gap-8 justify-center sm: flex-col md: flex-row">
            <div className="flex w-1/3 h-full bg-white rounded-lg flex-col p-5 sm: w-full h- ">
                <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
                <b className="p-1 text-slate-500">CARBON SAVED</b>
                <b className="text-3xl">1,240 Tons</b>
                <b className="p-1 text-emerald-600">
                        +12.4% this month
                    </b>
            </div>
            <div className="flex w-1/3 h-full bg-white rounded-lg flex-col p-5 ">
                <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
                <b className="p-1 text-slate-500">ECO-ROUTES ANALYZED</b>
                <b className="text-3xl">458,200+</b>
                <b className="p-1 text-emerald-600">
                        Verified by AI
                    </b>
            </div>
            <div className="flex w-1/3 h-full bg-white rounded-lg flex-col p-5 ">
                <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
                <b className="p-1 text-slate-500">ECO-TRAVELERS</b>
                <b className="text-3xl">15.8k Active</b>
                <b className="p-1 text-emerald-600">
                        +18% adoption rate
                    </b>
            </div>
        </div>
    </div>
    </>
  );
}
