/**
 * Shared TypeScript types for the Silver Prime Founders Club platform.
 */

export type TierLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Tier {
  id: string;
  name: string;
  priceUsd: number;
  icon: string;          // emoji icon
  level: TierLevel;      // 1 = lowest, 9 = highest
  description: string;
  color: string;         // tailwind/hex for badge colour
}

export interface Profile {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  isPublic: boolean;
  isVerified: boolean;
  isBanned: boolean;
  isAdmin: boolean;
  highestTierId: string | null;
  highestTierLevel: TierLevel | 0;
  totalInvestedUsd: number;
  createdAt: number;     // unix ms
}

export interface Investment {
  id: string;
  profileId: string;
  tierId: string;
  amountUsd: number;
  proofUrl: string;      // Firebase Storage URL
  status: "pending" | "approved" | "denied";
  reviewedBy: string | null;
  reviewedAt: number | null;
  adminNote: string;
  createdAt: number;
}

export interface FeedMessage {
  id: string;
  profileId: string;
  displayName: string;   // denormalised for fast render
  avatarUrl: string;     // denormalised
  highestTierId: string | null;
  highestTierLevel: TierLevel | 0;
  isPublic: boolean;
  content: string;
  isAnnouncement: boolean;  // auto-generated purchase notification
  createdAt: number;
}

export interface AdminDM {
  id: string;
  adminId: string;
  memberId: string;
  memberDisplayName: string;
  direction: "to_member" | "to_admin" | "from_member";
  content: string;
  readAt: number | null;
  createdAt: number;
}
