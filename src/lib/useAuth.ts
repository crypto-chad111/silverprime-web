"use client";

/**
 * Hook that tracks Firebase Auth state and loads the member's Firestore profile.
 * Used by all community + admin pages.
 */

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { Profile } from "@/lib/types";

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: User; profile: Profile };

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setState({ status: "unauthenticated" });
        return;
      }

      // Listen to profile doc in real-time (catches ban/verify changes instantly)
      const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (snap) => {
        if (!snap.exists()) {
          setState({ status: "unauthenticated" });
          return;
        }
        setState({
          status: "authenticated",
          user,
          profile: snap.data() as Profile,
        });
      });

      return unsubProfile;
    });

    return unsubAuth;
  }, []);

  return state;
}
