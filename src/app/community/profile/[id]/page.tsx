import { ProfilePageClient } from "./ProfilePageClient";

export const metadata = { title: "Member Profile — Silver Prime Founders Club" };

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfilePageClient uid={params.id} />;
}
