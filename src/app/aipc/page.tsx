import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MilestoneCard } from "@/components/MilestoneCard";
import { AIPCGallery, type GallerySlot } from "@/components/AIPCGallery";
import { lanes } from "../../../content/roadmap";
import Link from "next/link";

export const metadata = {
  title: "AIPC Drone — Silver Prime",
  description:
    "The Silver Prime AIPC is a ring-form AI companion drone. No separate app, no separate AI — your phone is the brain. Gallery, capabilities, specs, and hardware roadmap.",
};

const gallerySlots: GallerySlot[] = [
  { src: "/images/aipc-drone-solo.png",         label: "AIPC — studio product shot",                      available: true },
  { src: "/images/aipc-drone-user.png",         label: "AIPC — palm hover, scale reference",              available: true },
  { src: "/images/aipc-drone-internal.png",     label: "AIPC — internal components exploded",             available: true },
  { src: "/images/aipc-drone-outdoor.png",      label: "AIPC — outdoor GPS flight",                       available: true },
  { src: "/images/aipc-drone-lens.png",         label: "AIPC — camera lens close-up",                     available: true },
  { src: "/images/aipc-drone-pairing.png",      label: "AIPC — pairing with Silver Prime app",            available: true },
  { src: "/images/aipc-shoulder-charging.png",  label: "AIPC — landed and charging on shoulder platform", available: true },
  { src: "/images/aipc-shoulder-flight.png",    label: "AIPC — active scan, shoulder platform visible",   available: true },
];

const specs = [
  { label: "Weight",            value: "< 250 g — no FAA registration required (US)" },
  { label: "Diameter",          value: "~130 mm ring/toroid form" },
  { label: "Flight time",       value: "10–15 minutes per charge" },
  { label: "Connectivity",      value: "Wi-Fi Direct — connects to your phone, no router needed" },
  { label: "Camera",            value: "HD · RTSP stream direct to Silver Prime app" },
  { label: "Audio",             value: "Microphone array + speaker built in" },
  { label: "Navigation",        value: "GPS outdoor position hold · altitude hold indoors · return-to-home" },
  { label: "Compute",           value: "Onboard Linux SBC (flight control + Wi-Fi Direct) · AI runs on your phone" },
  { label: "Shoulder Platform", value: "Magnetic landing pad · wireless charging · USB-C backup · slim carbon fibre cross-body harness · fits all sizes" },
  { label: "Availability",      value: "Estimated Q1 2027" },
];

const capabilities = [
  {
    icon: "🧠",
    title: "Silver Prime is the brain",
    body: "No separate app, no separate AI. Your phone handles all inference — the drone streams HD video back to Silver Prime, which narrates, identifies, and acts on what it sees.",
  },
  {
    icon: "🌀",
    title: "Ring form — built to live with you",
    body: "Four rotors hidden inside oval vents around the circumference. Large hollow centre, camera flush on the equator rim. Fits in the palm of your hand. Under 250 g so no FAA registration is required for recreational use in the US.",
  },
  {
    icon: "📡",
    title: "Works without a router",
    body: "Wi-Fi Direct connects drone to phone directly — no home network required, works anywhere. Outdoor GPS for stable positioning. Indoor altitude hold keeps it stationary without GPS.",
  },
  {
    icon: "🎙️",
    title: "Voice from anywhere",
    body: "Built-in microphone array and speaker mean Silver Prime's voice can project from the drone itself. Ask a question — your AI answers from the air.",
  },
  {
    icon: "📷",
    title: "Your eyes in the room",
    body: "HD camera streams RTSP video back to Silver Prime in real time. The app narrates what it sees, identifies objects and faces, and can describe scenes on command.",
  },
  {
    icon: "🔒",
    title: "No subscription. Ever.",
    body: "All AIPC drones ship with Silver Prime pre-installed. The AI brain is your phone. No cloud fees, no monthly charges, no second account. One hardware purchase, done.",
  },
  {
    icon: "🎯",
    title: "Hands-free launch and return",
    body: "The shoulder platform harness sits snug across your chest — slim carbon fibre, not a gear rack. The AIPC lifts on command and returns to the magnetic charging pad on your shoulder when done. Wireless charging kicks in the moment it lands.",
  },
];

export default function AIPCPage() {
  return (
    <main className="relative">
      <Nav />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-36 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-warn">Coming 2027 · Hardware</p>
            <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
              <span className="silver-text">Silver Prime.</span>
              <br />
              <span className="shimmer-text">Now it can fly.</span>
            </h1>
            <p className="mt-6 text-lg text-silver-300 max-w-xl text-pretty">
              The AIPC is a ring-form AI companion drone. Silver Prime on your phone <em>is</em> the
              brain — the drone is your eyes, ears, and voice in the physical world. No separate app.
              No separate AI. No subscription.
            </p>
          </div>
          <span className="self-start md:self-auto rounded-full bg-warn/10 px-4 py-2 text-xs uppercase tracking-widest text-warn ring-1 ring-warn/30 whitespace-nowrap">
            Pre-announcement · Waitlist open
          </span>
        </div>

        {/* Stats strip — no pricing, specs only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { value: "< 250 g",      label: "No FAA registration" },
            { value: "10–15 min",    label: "Flight time" },
            { value: "Wi-Fi Direct", label: "No router needed" },
            { value: "HD Camera",    label: "RTSP to Silver Prime" },
            { value: "Q1 2027",      label: "Estimated ship date" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl glass p-4 text-center">
              <p className="text-xl font-semibold text-silver-100 mb-1">{s.value}</p>
              <p className="text-xs text-silver-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="text-xs uppercase tracking-widest text-silver-500 mb-4">AIPC Visualised</p>
        <AIPCGallery slots={gallerySlots} />
        <p className="mt-4 text-xs text-silver-600 text-center">
          AI-generated concept renders — final hardware may differ. Click any image to expand.
        </p>
      </section>

      {/* ── Capabilities ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">What it does</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold silver-text tracking-tight">
            One drone. Zero compromises.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl glass p-6">
              <span className="text-2xl mb-3 block">{c.icon}</span>
              <h3 className="font-semibold text-silver-100 mb-2">{c.title}</h3>
              <p className="text-sm text-silver-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Specs ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Specifications</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold silver-text tracking-tight">
            Under the hood.
          </h2>
        </div>
        <div className="rounded-2xl glass overflow-hidden">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 text-sm",
                i < specs.length - 1 ? "border-b border-silver-800/60" : "",
              ].join(" ")}
            >
              <span className="text-silver-500 shrink-0 sm:w-36">{s.label}</span>
              <span className="text-silver-200">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hardware Roadmap ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className="mb-10 rounded-2xl px-8 py-6"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(17,17,20,0.6) 60%)",
            border: "1px solid rgba(251,191,36,0.18)",
          }}
        >
          <p className="mb-2 text-xs uppercase tracking-widest text-warn">Hardware Roadmap</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight silver-text">
            Four phases to launch.
          </h2>
          <p className="mt-3 max-w-2xl text-silver-400">
            No hard dates. Each phase ships when it&apos;s ready, not when a calendar says so.
            Waitlist members are notified first when each phase opens.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-silver-500">
            <span className="rounded-full glass px-3 py-1">{"< 250 g · no FAA registration (US)"}</span>
            <span className="rounded-full glass px-3 py-1">Wi-Fi Direct · no router needed</span>
            <span className="rounded-full glass px-3 py-1">HD camera · mic + speaker</span>
            <span className="rounded-full glass px-3 py-1">Pricing via Kickstarter campaign</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lanes.hardware.map((m, i) => (
            <MilestoneCard key={m.id} m={m} index={i} />
          ))}
        </div>

        <p className="mt-6 text-xs text-silver-600">
          Hardware phases are indicative only. No dates are committed. Pricing to be confirmed with the Kickstarter campaign.
        </p>
      </section>

      {/* ── Pricing CTA — Kickstarter ── */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(17,17,20,0.8) 70%)",
            border: "1px solid rgba(251,191,36,0.2)",
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">Pricing · Coming Soon</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold silver-text tracking-tight mb-3">
            Pricing confirmed at Kickstarter launch.
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto mb-8">
            We&apos;re finalising hardware pricing as part of the Kickstarter campaign.
            Join the waitlist now — waitlist members will be notified first and guaranteed
            access to early backer pricing when the campaign goes live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kickstarter"
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold text-bg transition hover:brightness-110 shadow-glow"
              style={{ background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)" }}
            >
              Join the Kickstarter waitlist →
            </Link>
            <a
              href="/#waitlist"
              className="inline-block rounded-full glass px-8 py-3.5 text-sm font-semibold text-silver-100 hover:bg-bg-raised transition"
            >
              Join the app waitlist
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
