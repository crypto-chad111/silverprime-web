import type { Metadata } from "next";
import { FeedClient } from "./FeedClient";

export const metadata: Metadata = {
  title: "Live Feed — Silver Prime Founders Club",
  description: "Real-time community feed for Silver Prime backers.",
};

export default function FeedPage() {
  return <FeedClient />;
}
