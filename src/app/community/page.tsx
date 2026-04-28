import type { Metadata } from "next";
import { CommunityLandingClient } from "./CommunityLandingClient";

export const metadata: Metadata = {
  title: "Silver Prime Founders Club — Member Login",
  description:
    "The exclusive community for Silver Prime Kickstarter backers. Verify your investment and join the conversation.",
};

export default function CommunityPage() {
  return <CommunityLandingClient />;
}
