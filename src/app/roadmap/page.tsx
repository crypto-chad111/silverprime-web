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
      <section className="mx-auto max-w-6xl px-6 pt-36 pb-10">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Roadmap</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight silver-text text-balance">
          Progression, not promises.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-silver-300 text-pretty">
          Three lanes. One truth file. Every milestone on this page lives in{" "}
          <code className="rounded bg-bg-raised px-1.5 py-0.5 text-sm text-silver-200 ring-1 ring-silver-800">
            content/roadmap.ts
          </code>{" "}
          — edit one object, the page reflects it on the next build.
        </p>
      </section>

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

      <Footer />
    </main>
  );
}
