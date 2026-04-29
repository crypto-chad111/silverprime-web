"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Campaign config ──────────────────────────────────────────────────────────
// Update LAUNCH_DATE when the Kickstarter date is confirmed.
const LAUNCH_DATE = new Date("2026-10-01T10:00:00Z");

// ─── Tier data (14 total — 4 marked featured:true are shown on page as teaser) ─
const TIERS = [
  {
    emoji: "🌟",
    name: "Digital Supporter",
    price: 29,
    units: "Unlimited",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Silver Prime Premium — lifetime licence",
      "Name in the credits",
      "Exclusive backer Discord role",
    ],
  },
  {
    emoji: "🎯",
    name: "Drone Enthusiast",
    price: 49,
    units: "Unlimited",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Silver Prime Premium — lifetime licence",
      "AIPC drone launch-day news + specs",
      "Exclusive backer Discord role",
      "10% discount code for launch day",
    ],
  },
  {
    emoji: "🚀",
    name: "App Founding Member",
    price: 99,
    units: "500 spots",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Silver Prime Premium — lifetime licence",
      "Discord VIP channel access",
      "Private beta access to all app updates",
      "Founding Member badge",
    ],
  },
  {
    emoji: "🛸",
    name: "Pioneer Pack",
    price: 399,
    units: "150 units",
    tag: "Early Bird — 20% off",
    highlight: false,
    featured: true,
    perks: [
      "1× AIPC ring drone",
      "20% off retail price",
      "Ships Q1 2027",
      "Backer name in credits",
    ],
  },
  {
    emoji: "🛸",
    name: "Standard Pre-Order",
    price: 499,
    units: "250 units",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "1× AIPC ring drone",
      "Ships Q1 2027",
      "Backer name in credits",
      "Early firmware update access",
    ],
  },
  {
    emoji: "🛸",
    name: "Pro Bundle",
    price: 599,
    units: "250 units",
    tag: "Most Popular",
    highlight: true,
    featured: true,
    perks: [
      "1× AIPC ring drone",
      "Shoulder platform harness",
      "Spare battery + carry case",
      "Silver Prime Premium — lifetime",
      "Discord VIP channel",
    ],
  },
  {
    emoji: "🛸",
    name: "Full Kit",
    price: 699,
    units: "200 units",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "1× AIPC ring drone",
      "Shoulder platform harness",
      "Spare battery + carry case",
      "Silver Prime Premium — lifetime",
      "Hardshell travel case",
    ],
  },
  {
    emoji: "🏆",
    name: "Innovator Edition",
    price: 999,
    units: "100 units",
    tag: null,
    highlight: false,
    featured: true,
    perks: [
      "Everything in Full Kit",
      "Custom engraved nameplate",
      "Quarterly founder video calls",
      "First access to all future hardware",
    ],
  },
  {
    emoji: "💼",
    name: "Elite Pack",
    price: 1499,
    units: "75 units",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Everything in Innovator Edition",
      "Priority shipping slot",
      "Exclusive colourway (matte black)",
      "Silver Prime lifetime cloud backup",
    ],
  },
  {
    emoji: "💎",
    name: "Founding Partner",
    price: 2500,
    units: "30 spots",
    tag: null,
    highlight: false,
    featured: true,
    perks: [
      "Everything in Elite Pack",
      "1-on-1 video call with the founders",
      "Wall of Fame on silverprime.app",
      "Advisory role — shape the product",
    ],
  },
  {
    emoji: "🔰",
    name: "Executive Backer",
    price: 4999,
    units: "20 spots",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Everything in Founding Partner",
      "Dedicated account manager",
      "Early prototype access (pre-ship)",
      "Named in patent acknowledgements",
    ],
  },
  {
    emoji: "🏅",
    name: "Platinum Circle",
    price: 10000,
    units: "15 spots",
    tag: null,
    highlight: false,
    featured: false,
    perks: [
      "Everything in Executive Backer",
      "Quarterly shareholder-style briefings",
      "Product roadmap voting rights",
      "Lifetime free hardware upgrades",
    ],
  },
  {
    emoji: "👑",
    name: "Lead Investor",
    price: 15000,
    units: "10 spots",
    tag: "Exclusive",
    highlight: false,
    featured: false,
    perks: [
      "Everything in Platinum Circle",
      "In-person HQ visit + factory tour",
      "Company logo on the website",
      "Dedicated founder support line",
    ],
  },
  {
    emoji: "🌐",
    name: "Platinum Founder",
    price: 50000,
    units: "5 spots",
    tag: "Ultimate",
    highlight: false,
    featured: false,
    perks: [
      "Everything in Lead Investor",
      "Strategic partnership + co-branding",
      "Board observer seat",
      "Equity conversation rights",
      "Lifetime of all Silver Prime products",
    ],
  },
];

const STRETCH_GOALS = [
  {
    amount: "$1.5M",
    label: "Minimum goal",
    detail: "Year 1 production run — 1,000 units, core team setup",
    icon: "🚀",
  },
  {
    amount: "$2M",
    label: "Stretch goal A",
    detail: "Shoulder platform included FREE in all Pro+ tiers",
    icon: "🎁",
  },
  {
    amount: "$3M",
    label: "Stretch goal B",
    detail: "Dual-camera AIPC variant + night vision mode unlocked",
    icon: "🌙",
  },
];

const PILLARS = [
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

const FAQ = [
  {
    q: "When does the Kickstarter campaign launch?",
    a: "We're targeting Q4 2026. Join the waitlist and you'll be the first to know — waitlist members get 24-hour early access before the campaign goes public.",
  },
  {
    q: "Is this a real product or a concept render?",
    a: "Real product in active development. The images on this page are concept renders of the final design. Working prototypes exist — we'll be sharing build updates with the Founders Club and posting demo footage before launch.",
  },
  {
    q: "Do I need to buy Silver Prime separately?",
    a: "Silver Prime is a free Android app. The Premium tier (one-time ~$14.99) unlocks on-device AI. All drone tiers at $599+ include Silver Prime Premium for free.",
  },
  {
    q: "What if the campaign doesn't hit its goal?",
    a: "Kickstarter is all-or-nothing. If we don't hit the $1.5M minimum goal, every backer is automatically refunded in full — no questions asked.",
  },
  {
    q: "Will this work with iPhone?",
    a: "The AIPC hardware works with any phone via Wi-Fi Direct. However, the Silver Prime AI app is Android-only. iPhone support is not planned — Silver Prime is built specifically for Android's openness (background services, AccessibilityService, etc.).",
  },
  {
    q: "What countries will you ship to?",
    a: "We plan to ship globally. Drone regulations vary by country — it's your responsibility to check local rules. The AIPC is under 250g which exempts it from registration requirements in the US, UK, and most of the EU.",
  },
  {
    q: "How is this different from a DJI Mini?",
    a: "Completely different use case. DJI Mini is a photography drone you carry in a bag and fly recreationally. The AIPC is a wearable AI peripheral — it lives on your shoulder, lifts autonomously on command, and streams directly to your on-device AI. No app switching, no manual piloting.",
  },
  {
    q: "When do units ship?",
    a: "First units are targeted for Q1 2027 following a successful campaign. Pioneer Pack (Early Bird) backers ship first, followed by all other tiers in order.",
  },
];

const GALLERY_IMAGES = [
  { src: "/images/aipc-drone-solo.png",        alt: "AIPC ring drone — studio shot" },
  { src: "/images/aipc-drone-user.png",         alt: "AIPC drone in palm — scale reference" },
  { src: "/images/aipc-shoulder-flight.png",    alt: "AIPC active scan mode on shoulder platform" },
  { src: "/images/aipc-drone-outdoor.png",      alt: "AIPC drone outdoor GPS flight" },
  { src: "/images/aipc-shoulder-charging.png",  alt: "AIPC charging on shoulder platform" },
  { src: "/images/aipc-drone-lens.png",         alt: "AIPC camera lens close-up" },
];

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold tabular-nums"
        style={{ background: "rgba(124,92,255,0.12)", border: "1px solid rgba(124,92,255,0.3)" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] sm:text-xs text-white/40 mt-1.5 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border border-white/10 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <span className="font-medium text-white/90 text-sm sm:text-base">{q}</span>
        <span
          className="shrink-0 text-[#7C5CFF] transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          ✕
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function KickstarterClient() {
  const countdown = useCountdown(LAUNCH_DATE);

  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error,     setError]     = useState("");

  const [galleryIdx, setGalleryIdx] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // Check for duplicate
      const q = query(collection(db, "waitlistEmails"), where("email", "==", clean));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, "waitlistEmails"), {
          email: clean,
          source: "kickstarter",
          createdAt: Date.now(),
        });
      }
      setSubmitted(true);
    } catch {
      // Still show success — don't block the user over a Firestore rule miss
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7C5CFF]/10 blur-3xl" />
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
            <br />in the world.
            <br />
            <span className="text-white/60">We built it a body.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Silver Prime AIPC is a ring-form AI companion drone that lives on
            your shoulder, lifts on command, and gives your on-device AI the one
            thing it was missing — eyes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="#waitlist"
              className="px-8 py-4 bg-[#7C5CFF] hover:bg-[#6B4EE6] rounded-xl font-semibold text-lg transition-colors"
            >
              Join the Waitlist →
            </a>
            <a
              href="#tiers"
              className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-xl font-medium text-white/70 hover:text-white transition-colors"
            >
              See Reward Tiers
            </a>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/30 text-xs uppercase tracking-widest">Campaign launches in</p>
            <div className="flex items-start gap-3 sm:gap-4">
              <CountdownBlock value={countdown.days}  label="Days"    />
              <span className="text-2xl text-white/20 mt-4">:</span>
              <CountdownBlock value={countdown.hours} label="Hours"   />
              <span className="text-2xl text-white/20 mt-4">:</span>
              <CountdownBlock value={countdown.mins}  label="Minutes" />
              <span className="text-2xl text-white/20 mt-4">:</span>
              <CountdownBlock value={countdown.secs}  label="Seconds" />
            </div>
            <p className="text-white/20 text-xs">
              All-or-nothing · No charge until goal is met · Launching on Kickstarter 2026
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── PRODUCT GALLERY ───────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main image */}
          <div
            className="relative rounded-2xl overflow-hidden mb-3 cursor-pointer"
            style={{
              aspectRatio: "16/7",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Image
              src={GALLERY_IMAGES[galleryIdx].src}
              alt={GALLERY_IMAGES[galleryIdx].alt}
              fill
              className="object-cover"
              priority={galleryIdx === 0}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setGalleryIdx(i)}
                className="relative shrink-0 rounded-lg overflow-hidden transition"
                style={{
                  width: 80, height: 56,
                  border: `2px solid ${i === galleryIdx ? "#7C5CFF" : "rgba(255,255,255,0.08)"}`,
                  opacity: i === galleryIdx ? 1 : 0.55,
                }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-3 text-center">
            Concept renders — final hardware may vary · 6 images
          </p>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
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

      {/* ── THE PROBLEM ───────────────────────────────────────────────────── */}
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

      {/* ── PILLARS ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Built different. By design.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARD TIERS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6" id="tiers">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Kickstarter Reward Tiers
          </h2>
          <p className="text-white/50 text-center mb-14 max-w-xl mx-auto">
            Back early, back better. All-or-nothing — you&apos;re only charged if we hit
            our goal. Early bird and limited tiers will sell out fast.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.filter((t) => t.featured).map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{
                  border: tier.highlight
                    ? "1px solid rgba(124,92,255,0.6)"
                    : tier.tag === "Exclusive"
                    ? "1px solid rgba(251,191,36,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: tier.highlight
                    ? "rgba(124,92,255,0.08)"
                    : tier.tag === "Exclusive"
                    ? "rgba(251,191,36,0.04)"
                    : "rgba(255,255,255,0.02)",
                  boxShadow: tier.highlight
                    ? "0 0 40px rgba(124,92,255,0.12)"
                    : "none",
                }}
              >
                {tier.tag && (
                  <div
                    className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: tier.highlight
                        ? "#7C5CFF"
                        : tier.tag === "Exclusive"
                        ? "rgba(251,191,36,0.9)"
                        : "rgba(124,92,255,0.2)",
                      color: tier.tag === "Exclusive" ? "#0A0A0C" : "white",
                    }}
                  >
                    {tier.tag}
                  </div>
                )}

                <div className="text-3xl mb-2">{tier.emoji}</div>
                <div className="text-xs text-white/35 uppercase tracking-widest mb-1">{tier.units}</div>
                <h3 className="font-bold text-base mb-1">{tier.name}</h3>
                <div
                  className="text-2xl font-bold mb-4"
                  style={{ color: tier.tag === "Exclusive" ? "#FBBF24" : "#7C5CFF" }}
                >
                  ${tier.price.toLocaleString()}
                </div>

                <ul className="space-y-2 flex-1 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="text-sm text-white/55 flex items-start gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: tier.tag === "Exclusive" ? "#FBBF24" : "#7C5CFF" }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={
                    tier.highlight
                      ? { background: "#7C5CFF", color: "white" }
                      : tier.tag === "Exclusive"
                      ? { background: "rgba(251,191,36,0.15)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.3)" }
                      : { border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }
                  }
                >
                  Notify Me at Launch
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/25 text-sm mt-10">
            Full tier list (14 tiers including $50K Platinum Founder) available on launch day.
          </p>
          <p className="text-center text-white/20 text-xs mt-2">
            Prices shown are Kickstarter-exclusive. Retail pricing will be higher. All-or-nothing campaign.
          </p>
        </div>
      </section>

      {/* ── STRETCH GOALS ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            Stretch Goals
          </h2>
          <p className="text-white/40 text-center text-sm mb-10">
            The more we raise, the more you get.
          </p>
          <div className="space-y-4">
            {STRETCH_GOALS.map((g, i) => (
              <motion.div
                key={g.amount}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 rounded-xl px-6 py-5"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="text-2xl shrink-0">{g.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="font-bold text-[#7C5CFF] text-xl">{g.amount}</span>
                    <span className="text-white/35 text-xs uppercase tracking-widest">{g.label}</span>
                  </div>
                  <p className="text-white/50 text-sm">{g.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            Frequently asked questions
          </h2>
          <p className="text-white/40 text-center text-sm mb-10">
            Everything you need to know before backing.
          </p>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ──────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        id="waitlist"
        style={{ background: "rgba(124,92,255,0.04)", borderTop: "1px solid rgba(124,92,255,0.12)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"
              style={{ background: "rgba(124,92,255,0.15)", border: "1px solid rgba(124,92,255,0.4)" }}>
              🚀
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Be first to know when we launch.
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Join the pre-launch list. Early bird pricing is exclusively reserved
              for waitlist members — 24 hours before the campaign goes public.
              No spam. Unsubscribe any time.
            </p>

            {submitted ? (
              <div className="rounded-2xl p-8"
                style={{ border: "1px solid rgba(124,92,255,0.4)", background: "rgba(124,92,255,0.08)" }}>
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
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-xl text-white placeholder-white/30 focus:outline-none transition-all text-base"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.12)",
                  }}
                  required
                  disabled={submitting}
                />
                {error && <p className="text-red-400 text-sm text-left">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-4 rounded-xl font-semibold text-lg transition-colors disabled:opacity-60"
                  style={{ background: "#7C5CFF" }}
                >
                  {submitting ? "Joining…" : "Notify Me at Launch →"}
                </button>
                <p className="text-white/25 text-xs">
                  No spam. Early bird pricing reserved for list members only.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CAMPAIGN FACTS ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "$1.5M",   label: "Minimum goal" },
            { value: "~$3.1M",  label: "Full potential" },
            { value: "2026",    label: "Campaign launches" },
            { value: "Q1 2027", label: "First units ship" },
          ].map((f) => (
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
