# Session Checkpoint
**Project:** Silver Prime — AIPC Drone & Android AI Assistant
**Last updated:** 2026-04-29 (Session 3)
**Repo:** https://github.com/crypto-chad111/silverprime-web
**Live site:** https://silverprime.netlify.app
**Working directory:** C:\dev\SilverPrime-Web

---

## What This Project Is

**Silver Prime** is a freemium Android AI assistant (React Native 0.74, Android-only). Hybrid on-device AI (Phi-3-mini) + cloud fallback (Groq). "Hey Silver" wakeword, Whisper STT, encrypted persistent memory, context awareness via AccessibilityService. One-time Premium unlock ~$14.99. No subscription.

**The website** (this repo) is the marketing/showcase site built in Next.js 14 App Router + TypeScript + Tailwind + Framer Motion. Auto-deploys to Netlify from the `main` branch.

**AIPC Companion Drone** — ring/toroid-form drone (~130mm, <250g, Linux SBC, HD camera, Wi-Fi Direct). Phone IS the brain. Coming Q1 2027. Pricing TBD — held until Kickstarter.

**Silver Prime Founders Club** — gated investor community platform. Firebase-backed. Routes under `/community` and `/admin`.

---

## What Was Completed This Session (2026-04-29 Session 3)

| Commit | What Shipped |
|---|---|
| `99c0065` | Fix: admin DM query — removed orderBy to avoid missing Firestore composite index |
| `c33170e` | Member DM inbox on My Profile — real-time messages from admin with "X new" badge |
| `a01db2d` | Public profile page `/community/profile/[id]` · Private avatar guard in feed (no link if private) · Member DM reply input |
| `483469d` | Fix: DM reply — static addDoc import, error handling |

**Firestore rules updated this session (in Firebase Console):**
- Profiles: admin can update any profile (fixes ban/approve silently failing)
- Investments: admin can update any investment
- Feed: verified non-banned members + admins can read/write
- adminDms: members can create `from_member` direction DMs (replies)

**Tested and confirmed working:**
- ✅ Signup flow end-to-end
- ✅ Feed real-time chat
- ✅ Avatar/banner upload
- ✅ Password change
- ✅ Admin login (isAdmin check)
- ✅ Admin dashboard: overview stats, pending queue, member table, search
- ✅ Approve member → feed announcement posted
- ✅ Ban / unban member
- ✅ Admin → member DM
- ✅ Member → admin DM reply (appears in admin dashboard thread)
- ✅ Public profile page with avatar, banner, bio, tier, invested amount
- ✅ Private profile page shows 🔒 anonymous backer + tier badge only
- ✅ Feed avatar: public = clickable link, private = grey circle, not clickable
- ✅ Netlify deploy working (secrets scanner bypassed with OMIT_VALUES env var)

---

## Current State of Every Route

### Website Routes
| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Live | Home page |
| `/features` | ✅ Live | App features |
| `/aipc` | ✅ Live | Full AIPC drone page |
| `/roadmap` | ✅ Live | App + hardware milestones |
| `/why` | ✅ Live | Comparison matrix |
| `/download` | ✅ Live | APK access |
| `/kickstarter` | ✅ Live | Pre-launch waitlist |
| `/api/chat` | ✅ Live | SilverBot AI backend (Groq) |

### Founders Club Routes
| Route | Status | Notes |
|---|---|---|
| `/community` | ✅ Live | Login + tier badge showcase + password reset |
| `/community/signup` | ✅ Live | 3-step signup with proof upload |
| `/community/pending` | ✅ Live | Pending approval waiting screen |
| `/community/feed` | ✅ Live | Real-time chat, tier stats bar, privacy-aware avatars |
| `/community/me` | ✅ Live | Profile editor, avatar/banner, investments, DM inbox + reply, password change |
| `/community/profile/[id]` | ✅ Live | Public profile view; private shows anonymous backer |
| `/admin` | ✅ Live | Admin login with isAdmin check |
| `/admin/dashboard` | ✅ Live | Overview, pending queue, member table, ban/unban, DM thread |
| `/admin/recovery` | 🔲 TODO | Safe code lockout recovery |

---

## Firebase Project
| Resource | Status | Notes |
|---|---|---|
| Project ID | `silverprime-founders` | Blaze plan |
| Firestore | ✅ Live | eur3 europe-west, updated production rules |
| Storage | ✅ Live | US-CENTRAL1, production rules |
| Auth | ✅ Live | Email/Password enabled |

### Current Firestore Rules (as of this session)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.isAdmin == true;
    }
    function isVerifiedMember() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.isVerified == true &&
        get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.isBanned == false;
    }
    match /profiles/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.auth.uid == userId;
      allow update: if (isSignedIn() && request.auth.uid == userId) || isAdmin();
      allow delete: if isAdmin();
    }
    match /investments/{investId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    match /feedMessages/{msgId} {
      allow read: if isVerifiedMember() || isAdmin();
      allow create: if isVerifiedMember() || isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    match /adminDms/{dmId} {
      allow read: if isAdmin() || (isSignedIn() && resource.data.memberId == request.auth.uid);
      allow create: if isAdmin() ||
        (isSignedIn() &&
         request.resource.data.memberId == request.auth.uid &&
         request.resource.data.direction == "from_member");
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

---

## Netlify Environment Variables
| Variable | Status |
|---|---|
| `GROQ_API_KEY` | ✅ Set (secret) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ Set (NOT secret) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ Set (NOT secret) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ Set (NOT secret) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ Set (NOT secret) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ Set (NOT secret) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ Set (NOT secret) |
| `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES` | ✅ Set — bypasses AIza*** pattern scanner |
| `ADMIN_SAFE_CODE` | ⚠️ NOT YET SET — needed for /admin/recovery |

---

## Admin Account Setup
Your real admin account is created and working. To verify in Firestore the profile doc should have:
- `isAdmin: true`
- `isVerified: true`
- `highestTierId: "lead-investor"`
- `highestTierLevel: 9`

---

## Pending Work — Do This Next

**1. `/admin/recovery`** — safe code lockout recovery
- Admin enters `ADMIN_SAFE_CODE` passphrase + registered email → receives reset link
- Agree on the passphrase, add `ADMIN_SAFE_CODE` to Netlify env vars

**2. Domain purchase + Netlify setup**
- User is shopping on Namecheap
- Top picks: `silverprime.ai` (best), `silverprime.app` (cheaper ~$16/yr)
- Once purchased: Netlify → Site configuration → Domain management → Add custom domain
- Point nameservers or add CNAME/A records as Netlify instructs

**3. Kickstarter campaign page — full build**
- Countdown timer, finalised tier pricing, email capture backend

**4. Email backend**
- Wire /kickstarter and /#waitlist forms to real email capture

---

## Key Product Decisions On Record
| Decision | Rationale |
|---|---|
| Android-only | iOS cancelled, not deferred |
| No custom token | Solana marketplace uses $SOL only |
| AIPC pricing held | Not published until Kickstarter campaign finalised |
| HQ location | TBD — Saudi Arabia high on list but private until finalised |
| Kickstarter-only funding | No VC, no angels, no grants |
| Firebase (not Supabase) | User already had Firebase account; Supabase project was paused >90 days |
| Founders Club = /community | Same domain, not separate |
| Platform name | Silver Prime Founders Club |
| Admin safe code | Agreed privately at build time, stored only as Netlify env var `ADMIN_SAFE_CODE` |
| Firebase API keys | NOT secret — protected by security rules + authorized domains |
| SilverBot knowledge base | `src/data/silverbot-knowledge.ts` — edit to update AI answers |

---

## How to Resume in a New Session
```
Read CLAUDE.md and SESSION_CHECKPOINT.md, then tell me where we left off and what the next step is.
```

---

## Checkpoint Protocol
Type `/checkpoint` and Claude will:
1. Run `git log --oneline -10`
2. Review all changed files since last checkpoint
3. Update `SESSION_CHECKPOINT.md`
4. Update `CLAUDE.md` pending work section if anything changed
5. Commit both files to `main` with message: `chore: session checkpoint [date]`
6. Push to origin/main
7. Confirm: "Checkpoint saved and pushed ✅"
