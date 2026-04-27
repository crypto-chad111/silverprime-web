import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { HowItWorks } from "@/components/HowItWorks";
import { AIPCTeaser } from "@/components/AIPCTeaser";
import { Pricing } from "@/components/Pricing";
import { SkillEconomyTeaser } from "@/components/SkillEconomyTeaser";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Pillars />
      <HowItWorks />
      <AIPCTeaser />
      <Pricing />
      <SkillEconomyTeaser />
      <Waitlist />
      <Footer />
    </main>
  );
}
