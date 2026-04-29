"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { TierBadge } from "@/components/community/TierBadge";
import type { Profile } from "@/lib/types";

export function ProfilePageClient({ uid }: { uid: string }) {
  const router    = useRouter();
  const authState = useAuth();

  const [profile, setProfile]   = useState<Profile | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Must be a verified member to view profiles
  useEffect(() => {
    if (authState.status === "unauthenticated") { router.push("/community"); return; }
    if (authState.status === "authenticated") {
      if (authState.profile.isBanned) { router.push("/community"); return; }
      if (!authState.profile.isVerified && !authState.profile.isAdmin) {
        router.push("/community/pending"); return;
      }
    }
  }, [authState, router]);

  // Load the target profile
  useEffect(() => {
    if (authState.status !== "authenticated") return;

    // Redirect to own profile page if viewing self
    if (uid === authState.profile.uid) {
      router.replace("/community/me");
      return;
    }

    (async () => {
      const snap = await getDoc(doc(db, "profiles", uid));
      if (!snap.exists()) { setNotFound(true); setLoading(false); return; }
      setProfile(snap.data() as Profile);
      setLoading(false);
    })();
  }, [uid, authState, router]);

  if (authState.status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0C" }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#7C5CFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <PageShell>
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white font-semibold">Member not found</p>
          <p className="text-silver-500 text-sm mt-2">This profile doesn&apos;t exist or has been removed.</p>
        </div>
      </PageShell>
    );
  }

  if (!profile) return null;

  const viewerIsAdmin = authState.status === "authenticated" && authState.profile.isAdmin;

  // Private profile — show minimal info to regular members, full info to admins
  if (!profile.isPublic && !viewerIsAdmin) {
    return (
      <PageShell>
        <div className="max-w-md mx-auto text-center py-16 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            🔒
          </div>
          <div>
            <p className="text-white font-semibold">Anonymous backer</p>
            <p className="text-silver-500 text-sm mt-1">This member keeps their profile private.</p>
          </div>
          {profile.highestTierId && (
            <TierBadge tierId={profile.highestTierId} size="md" showName />
          )}
          <p className="text-silver-600 text-xs">Only their tier level is visible.</p>
        </div>
      </PageShell>
    );
  }

  // Full profile (public members, or any profile viewed by admin)
  return (
    <PageShell>
      <div className="max-w-2xl mx-auto">

        {/* Banner */}
        <div className="rounded-2xl overflow-hidden mb-0"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <div
            className="h-40"
            style={{
              background: profile.bannerUrl
                ? `url(${profile.bannerUrl}) center/cover`
                : "linear-gradient(135deg, rgba(124,92,255,0.3), rgba(10,10,12,0.8))",
            }}
          />

          {/* Avatar + info */}
          <div className="px-6 pb-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 shrink-0"
                style={{ borderColor: "#0A0A0C", background: "rgba(255,255,255,0.1)" }}>
                {profile.avatarUrl
                  ? <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                  : <span className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                      {profile.displayName?.[0]?.toUpperCase()}
                    </span>
                }
              </div>
              <div className="flex-1 min-w-0 pt-10">
                <h1 className="text-xl font-bold text-white">{profile.displayName}</h1>
                <p className="text-silver-500 text-sm">@{profile.username}</p>
              </div>
            </div>

            {profile.bio && (
              <p className="text-silver-300 text-sm mb-4">{profile.bio}</p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <TierBadge tierId={profile.highestTierId} size="md" showName />
              {!profile.isPublic && viewerIsAdmin && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}>
                  🔒 Private profile
                </span>
              )}
              {profile.totalInvestedUsd > 0 && (
                <span className="text-xs text-silver-400 px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  ${profile.totalInvestedUsd.toLocaleString()} invested
                </span>
              )}
              {profile.isVerified && (
                <span className="text-xs text-emerald-400 px-3 py-1 rounded-full"
                  style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  ✓ Verified backer
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-silver-600 text-xs">
            Member since {new Date(profile.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>
        </div>

      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <header className="flex items-center px-5 py-3 sticky top-0 z-30"
        style={{ background: "rgba(10,10,12,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <Link href="/community/feed" className="text-sm text-silver-400 hover:text-white transition">
          ← Back to feed
        </Link>
      </header>
      <div className="px-4 py-8">{children}</div>
    </div>
  );
}
