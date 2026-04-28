"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tiers = [
  {
    emoji: "⚡",
    name: "Early Bird",
    price: "$149",
    units: "First 200 units",
    perks: [
      "1× AIPC ring drone",
      "20% off retail price",
      "Ships Q1 2027",
      "Backer name in credits",
    ],
    highlight: false,
  },
  {
    emoji: "🛸",
    name: "Pro Bundle",
    price: "$599",
    units: "Limited",
    perks: [
      "1× AIPC ring drone",
      "Shoulder platform harness",
      "Spare battery + carry case",
      "Silver Prime Premium (lifetime)",
      "Discord VIP channel",
    ],
    highlight: true,
  },
  {
    emoji: "🏆",
    name: "Innovator Edition",
    price: "$999",
    units: "100 units",
    perks: [
      "Everything in Pro Bundle",
      "Engraved nameplate on drone",
      "Quarterly founder video calls",
      "First access to all future hardware",
    ],
    highlight: false,
  },
  {
    emoji: "💎",
    name: "Founding Partner",
    price: "$2,500",
    units: "30 spots",
    perks: [
      "Everything in Innovator Edition",
      "1-on-1 video call with founders",
      "Wall of Fame on silverprime.app",
      "Advisory role — shape the product",
    ],
    highlight: false,
  },
];

const pillars = [
  {
    icon: "🧠",
    title: "Your phone IS the brain",
    body: "No separate AI, no cloud subscription. Silver Prime runs Phi-3-mini entirely on your device. The AIPC is the eyes.",
  },
  {
    icon: "🔒",
    title: "Zero data leaves your device",
    body: "Everything processed locally. No servers. No data harvesting. Your AI sees what you see — and only you.",
  },
  {
    icon: "⚖️",
    title: "Under 250 g",
    body: "No FAA registration required in the US. No drone licence in most countries. Lift off anywhere, any time.",
  },
  {
    icon: "🌀",
    title: "Ring form — built to live with you",
    body: "Lands on your shoulder, lifts on command. Not a weekend toy — a daily companion.",
  },
];

const stretchGoals = [
  { amount: "$1.5M", label: "Minimum goal",   detail: "Year 1 production run — 1,000 units, core team setup" },
  { amount: "$2M",   label: "Stretch goal A", detail: "Shoulder platform included FREE in all Pro+ tiers" },
  { amount: "$3M",   label: "Stretch goal B", detail: "Dual-camera AIPC variant + night vision mode unlocked" },
];

const campaignFacts = [
  { value: "$1.5M",   label: "Minimum goal" },
  { value: "~$3.1M",  label: "Full potential (14 tiers)" },
  { value: "2026",    label: "Campaign launches" },
  { value: "Q1 2027", label: "First units ship" },
];

export function KickstarterClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // TODO: wire to Mailchimp / ConvertKit / Supabase
    setSubmitted(true);
    setError("");
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#7C5CFF]/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7C5CFF]/40 bg-[#7C5CFF]/10 text-[#A78BFF] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse" />
            Kickstarter Pre-Launch — Join the waitlist now
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            You already carry the{" "}
            <span className="text-[#7C5CFF]">most powerful AI</span>
            <br />
            in the world.
            <br />
            <span className="text-white/60">We built it a body.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Silver Prime AIPC is a ring-form AI companion drone that lives on
            your shoulder, lifts on command, and gives your on-device AI the one
            thing it was missing — eyes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#waitlist"
              className="px-8 py-4 bg-[#7C5CFF] hover:bg-[#6B4EE6] rounded-xl font-semibold text-lg transition-colors"
            >
              Notify Me at Launch
            </a>
            <a
              href="/aipc"
              className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-xl font-medium text-white/70 hover:text-white transition-colors"
            >
              Learn More About the AIPC →
            </a>
          </div>

          <p className="mt-6 text-white/30 text-sm">
            Campaign launches 2026 · All-or-nothing · No charge until goal is met
          </p>
        </motion.div>
      </section>

      {/* ── STAT BAR ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#7C5CFF] mb-1">&lt; 250g</div>
            <div className="text-white/50 text-sm">No FAA registration required</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#7C5CFF] mb-1">100% on-device</div>
            <div className="text-white/50 text-sm">Zero cloud · Zero data leaks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#7C5CFF] mb-1">~130mm</div>
            <div className="text-white/50 text-sm">Ring form · fits in your palm</div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Every AI assistant has the same flaw.
            <br />
            <span className="text-[#7C5CFF]">It&apos;s stuck.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Siri lives in a rectangle. Alexa is bolted to a shelf. ChatGPT is a browser tab.
            They&apos;re powerful — and completely blind to the physical world unless you hold
            a camera up to it and tell them exactly what they&apos;re looking at.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            We didn&apos;t build another AI model. We gave the AI a body. A ring that lifts
            silently from your shoulder, orbits your world, and sends everything it sees
            directly to the Silver Prime AI running on your phone.
          </p>
          <p className="text-white/80 text-xl font-semibold">
            Your phone IS the brain. The AIPC is the eyes.
          </p>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Built different. By design.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARD TIERS ─────────────────────────────────────────── */}
      <section className="py-20 px-6" id="tiers">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Kickstarter Reward Tiers
          </h2>
          <p className="text-white/50 text-center mb-14 max-w-xl mx-auto">
            Back early, back better. Every tier is all-or-nothing — you&apos;re only
            charged if the campaign hits its goal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.highlight
                    ? "border-[#7C5CFF] bg-[#7C5CFF]/10 shadow-lg shadow-[#7C5CFF]/20"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#7C5CFF] rounded-full text-xs font-semibold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="text-3xl mb-3">{tier.emoji}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{tier.units}</div>
                <h3 className="font-bold text-lg mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold text-[#7C5CFF] mb-4">{tier.price}</div>
                <ul className="space-y-2 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-[#7C5CFF] mt-0.5 shrink-0">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`mt-6 block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-[#7C5CFF] hover:bg-[#6B4EE6] text-white"
                      : "border border-white/20 hover:border-white/40 text-white/70 hover:text-white"
                  }`}
                >
                  Notify Me
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">
            Full tier list (14 tiers including $50K Platinum Founder) available on launch day.
          </p>
        </div>
      </section>

      {/* ── STRETCH GOALS ────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Stretch Goals
          </h2>
          <div className="space-y-4">
            {stretchGoals.map((g, i) => (
              <div
                key={g.amount}
                className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4"
              >
                <div className="w-8 h-8 rounded-full border border-[#7C5CFF]/50 flex items-center justify-center text-[#7C5CFF] font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-[#7C5CFF] text-lg">{g.amount}</span>
                    <span className="text-white/40 text-xs uppercase tracking-widest">{g.label}</span>
                  </div>
                  <p className="text-white/50 text-sm mt-0.5">{g.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST FORM ────────────────────────────────────────── */}
      <section className="py-24 px-6" id="waitlist">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 flex items-center justify-center text-3xl mx-auto mb-6">
              🚀
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Be first to know when we launch.
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Join the pre-launch list. Early bird pricing ($149) is exclusively
              reserved for waitlist members — first come, first served.
              No spam. Unsubscribe any time.
            </p>

            {submitted ? (
              <div className="rounded-2xl border border-[#7C5CFF]/40 bg-[#7C5CFF]/10 p-8">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-xl mb-2">You&apos;re on the list.</h3>
                <p className="text-white/50 text-sm">
                  We&apos;ll email you the moment the campaign goes live —
                  with your exclusive early bird link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#7C5CFF]/60 focus:bg-white/[0.08] transition-all text-base"
                  required
                />
                {error && (
                  <p className="text-red-400 text-sm text-left">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#7C5CFF] hover:bg-[#6B4EE6] active:bg-[#5A40D4] rounded-xl font-semibold text-lg transition-colors"
                >
                  Notify Me at Launch →
                </button>
                <p className="text-white/25 text-xs">
                  No spam. Early bird pricing reserved for list members only.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CAMPAIGN FACTS ───────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {campaignFacts.map((f) => (
            <div key={f.label}>
              <div className="text-2xl font-bold text-[#7C5CFF] mb-1">{f.value}</div>
              <div className="text-white/40 text-xs">{f.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
