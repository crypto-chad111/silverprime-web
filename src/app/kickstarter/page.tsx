import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { KickstarterClient } from "./KickstarterClient";

export const metadata = {
  title: "Kickstarter — Silver Prime AIPC Drone",
  description:
    "Join the Silver Prime AIPC pre-launch waitlist. A ring-form AI companion drone — your phone is the brain, the AIPC is the eyes. Kickstarter campaign launching 2026.",
};

export default function KickstarterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white">
      <Nav />
      <KickstarterClient />
      <Footer />
    </div>
  );
}
