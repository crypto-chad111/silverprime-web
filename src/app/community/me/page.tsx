import type { Metadata } from "next";
import { MyProfileClient } from "./MyProfileClient";

export const metadata: Metadata = {
  title: "My Profile — Silver Prime Founders Club",
};

export default function MyProfilePage() {
  return <MyProfileClient />;
}
