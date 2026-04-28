import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MilestoneCard } from "@/components/MilestoneCard";
import { lanes } from "../../../content/roadmap";

export const metadata = {
  title: "Roadmap — Silver Prime",
  description: "Where we started, where we are, where we're headed. The Silver Prime roadmap.",
};

const laneMeta = [
  { key: "past" as const,    label: "Where we started", accent: "text-silver-400" },
  { key: "present" as const, label: "Where we are",     accent: "text-accent-glow" },
  { key: "future" as const,  label: "Where we're headed", accent: "text-silver-300" },
];

export default function RoadmapPage() {
  return (
    <main className="relative">
      <Nav />

      {/* Page header */}
      <section className="mx-auto max-w-6xl px-6 pt-36 pb-10">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Roadmap</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight silver-text text-balance">
          Progression, not promises.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-silver-300 text-pretty">
          Three lanes for the app. One more for the hardware.
          Every milestone lives in{" "}
          <code className="rounded bg-bg-raised px-1.5 py-0.5 text-sm text-silver-200 ring-1 ring-silver-800">
            content/roadmap.ts
          </code>{" "}
          — edit one object, the page reflects it on the next build.
        </p>
      </section>

      {/* Software lanes */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {laneMeta.map((lane) => (
            <div key={lane.key} className="flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <span className={`text-xs uppercase tracking-widest ${lane.accent}`}>{lane.label}</span>
                <span className="h-px flex-1 bg-silver-800" />
              </div>
              <div className="flex flex-col gap-4">
                {lanes[lane.key].map((m, i) => (
                  <MilestoneCard key={m.id} m={m} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AIPC hardware track */}
      <section
        id="aipc-roadmap"
        className="mx-auto max-w-6xl px-6 pb-24"
      >
        {/* Divider + header */}
        <div className="mb-10 rounded-2xl px-8 py-6"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(17,17,20,0.6) 60%)",
            border: "1px solid rgba(251,191,36,0.18)",
          }}
        >
          <p className="mb-2 text-xs uppercase tracking-widest text-warn">Hardware track</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight silver-text">
            AIPC Companion Drone
          </h2>
          <p className="mt-3 max-w-2xl text-silver-400">
            A separate product track running alongside the app.
            Silver Prime on your phone is the AI brain — the drone is a sensor and actuator peripheral.
            No hard dates: phases ship when they&apos;re ready, not when a calendar says so.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-silver-500">
            <span className="rounded-full glass px-3 py-1">{"< 250 g · no FAA registration (US)"}</span>
            <span className="rounded-full glass px-3 py-1">Wi-Fi Direct · no router needed</span>
            <span className="rounded-full glass px-3 py-1">HD camera · mic + speaker</span>
            <span className="rounded-full glass px-3 py-1">Pricing via Kickstarter campaign</span>
          </div>
        </div>

        {/* Phase cards — horizontal timeline on desktop */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lanes.hardware.map((m, i) => (
            <MilestoneCard key={m.id} m={m} index={i} />
          ))}
        </div>

        <p className="mt-8 text-xs text-silver-600">
          Hardware phases are indicative only. No dates are committed. Waitlist members will be
          notified first when each phase opens.
        </p>
      </section>

      <Footer />
    </main>
  );
}
