import type { Metadata } from "next";
import { SignupClient } from "./SignupClient";

export const metadata: Metadata = {
  title: "Apply to Join — Silver Prime Founders Club",
  description: "Verify your Kickstarter investment and join the Silver Prime Founders Club.",
};

export default function SignupPage() {
  return <SignupClient />;
}
