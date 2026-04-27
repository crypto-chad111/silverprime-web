import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MilestoneCard } from "@/components/MilestoneCard";
import { AIPCGallery, type GallerySlot } from "@/components/AIPCGallery";
import { lanes } from "../../../content/roadmap";

export const metadata = {
  title: "AIPC Drone — Silver Prime",
  description:
    "The Silver Prime AIPC is a palm-sized AI companion drone. No separate app, no separate AI — your phone is the brain. Specs, pricing, gallery, and hardware roadmap.",
};

const gallerySlots: GallerySlot[] = [
  { src: "/images/aipc-drone-solo.png",         label: "AIPC — studio product shot",                    available: true  },
  { src: "/images/aipc-drone-user.png",         label: "AIPC — palm hover, scale reference",            available: true  },
  { src: "/images/aipc-drone-internal.png",     label: "AIPC — internal components exploded",           available: true  },
  { src: "/images/aipc-drone-outdoor.png",      label: "AIPC — outdoor GPS flight",                     available: true  },
  { src: "/images/aipc-drone-lens.png",         label: "AIPC — camera lens close-up",                   available: true  },
  { src: "/images/aipc-drone-pairing.png",      label: "AIPC — pairing with Silver Prime app",          available: true  },
  { src: "/images/aipc-shoulder-charging.png",  label: "AIPC — landed and charging on shoulder platform", available: true  },
  { src: "/images/aipc-shoulder-flight.png",    label: "AIPC — active scan, shoulder platform visible",   available: true  },
];

const specs = [
  { label: "Weight",       value: "< 250 g — no FAA registration required (US)" },
  { label: "Diameter",     value: "~130 mm carbon composite disc body" },
  { label: "Flight time",  value: "10–15 minutes per charge" },
  { label: "Connectivity", value: "Wi-Fi Direct — connects to your phone, no router needed" },
  { label: "Camera",       value: "HD · RTSP stream direct to Silver Prime app" },
  { label: "Audio",        value: "Microphone array + speaker built in" },
  { label: "Navigation",   value: "GPS outdoor position hold · altitude hold indoors · return-to-home" },
  { label: "Compute",          value: "Onboard Linux SBC (flight control + Wi-Fi Direct) · AI runs on your phone" },
  { label: "Shoulder Platform", value: "Magnetic landing pad · wireless charging · USB-C backup · slim carbon fibre cross-body harness · fits all sizes" },
  { label: "Availability",     value: "Estimated Q1 2027 — waitlist only during early bird phase" },
];

const pricingRows = [
  { tier: "Waitlist / Early Bird", price: "$149", detail: "First 200 units · ships Q1 2027", highlight: true },
  { tier: "Standard Retail",       price: "$199", detail: "130 mm carbon frame · GPS · HD camera · speaker/mic", highlight: false },
  { tier: "Pro Bundle",            price: "$249", detail: "Includes spare battery + carry case", highlight: false },
  { tier: "Shoulder Platform",     price: "$49",  detail: "Magnetic landing pad · wireless charging · fits all harness sizes", highlight: false },
  { tier: "Full Kit Bundle",       price: "$289", detail: "Pro drone + shoulder platform + Silver Prime Premium", highlight: false },
  { tier: "App + Drone Bundle",    price: "$259", detail: "Pro drone + Silver Prime Premium (save $5)", highlight: false },
];

const capabilities = [
  {
    icon: "🧠",
    title: "Silver Prime is the brain",
    body: "No separate app, no separate AI. Your phone handles all inference — the drone streams HD video back to Silver Prime, which narrates, identifies, and acts on what it sees.",
  },
  {
    icon: "🌀",
    title: "Invisible rotors, clean form",
    body: "Circular disc body. Four rotors hidden inside — only oval airflow vents are visible on the exterior. Fits in the palm of your hand. Under 250 g so no FAA registration is required for recreational use in the US.",
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
    body: "The shoulder platform harness sits snug across your chest — slim carbon fibre and brushed aluminium, not a gear rack. The AIPC lifts off on command and returns to the magnetic charging pad on your shoulder when done. Wireless charging kicks in the moment it lands. USB-C backup keeps you topped up on the go.",
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
              The AIPC is a palm-sized AI companion drone. Silver Prime on your phone <em>is</em> the
              brain — the drone is your eyes, ears, and voice in the physical world. No separate app.
              No separate AI. No subscription.
            </p>
          </div>
          <span className="self-start md:self-auto rounded-full bg-warn/10 px-4 py-2 text-xs uppercase tracking-widest text-warn ring-1 ring-warn/30 whitespace-nowrap">
            Pre-announcement · Waitlist open
          </span>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { value: "<250 g",      label: "No FAA registration" },
            { value: "10–15 min",   label: "Flight time" },
            { value: "Wi-Fi Direct",label: "No router needed" },
            { value: "$149",        label: "Early bird price" },
            { value: "HD Camera",   label: "RTSP to Silver Prime" },
            { value: "Q1 2027",     label: "Estimated ship date" },
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
              <span className="text-silver-500 shrink-0 sm:w-32">{s.label}</span>
              <span className="text-silver-200">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">Pricing</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold silver-text tracking-tight">
            One purchase. No subscription.
          </h2>
          <p className="mt-3 text-silver-400 max-w-xl">
            Early bird pricing is guaranteed for waitlist members who confirm their spot.
            All prices are preliminary estimates subject to change.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-silver-800 mb-6">
          {pricingRows.map((row, i) => (
            <div
              key={row.tier}
              className={[
                "flex items-center justify-between gap-4 px-6 py-4 text-sm",
                i < pricingRows.length - 1 ? "border-b border-silver-800" : "",
                row.highlight ? "bg-warn/8" : "",
              ].join(" ")}
            >
              <div>
                <p className={`font-medium ${row.highlight ? "text-warn" : "text-silver-200"}`}>
                  {row.tier}
                </p>
                <p className="text-xs text-silver-500 mt-0.5">{row.detail}</p>
              </div>
              <span className={`text-lg font-semibold whitespace-nowrap ${row.highlight ? "text-warn" : "text-silver-100"}`}>
                {row.price}
              </span>
            </div>
          ))}
        </div>

        {/* Bundle callout */}
        <div
          className="rounded-2xl glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ border: "1px solid rgba(124,92,255,0.25)" }}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-semibold text-silver-100">Best value: Full Kit Bundle</p>
              <p className="text-sm text-silver-400 mt-0.5">
                Pro drone + shoulder platform + Silver Prime Premium — everything in one.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-2xl font-semibold silver-text">$289</p>
              <p className="text-xs text-silver-500">bundle price</p>
            </div>
            <a
              href="/#waitlist"
              className="rounded-full bg-silver-grad px-5 py-2.5 text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition whitespace-nowrap"
            >
              Reserve now
            </a>
          </div>
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
            <span className="rounded-full glass px-3 py-1">Early bird $149 · Standard $199</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lanes.hardware.map((m, i) => (
            <MilestoneCard key={m.id} m={m} index={i} />
          ))}
        </div>

        <p className="mt-6 text-xs text-silver-600">
          Hardware phases are indicative only. No dates are committed. All prices are preliminary estimates.
        </p>
      </section>

      {/* ── Waitlist CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(17,17,20,0.8) 70%)",
            border: "1px solid rgba(251,191,36,0.2)",
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">Limited early bird</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold silver-text tracking-tight mb-3">
            First 200 units. $149.
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto mb-8">
            Join the waitlist to lock in the early bird price. You&apos;ll be notified first when
            pre-orders open — no commitment required to join.
          </p>
          <a
            href="/#waitlist"
            className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold text-bg transition hover:brightness-110 shadow-glow"
            style={{ background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)" }}
          >
            Reserve my early bird spot
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
