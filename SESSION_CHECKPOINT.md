# Session Checkpoint
**Project:** Silver Prime — AIPC Drone & Android AI Assistant
**Last updated:** 2026-04-30 (Session 5)
**Repo:** https://github.com/crypto-chad111/silverprime-web
**Live site:** https://silverprime.app
**Fallback:** https://silverprime.netlify.app
**Working directory:** C:\dev\SilverPrime-Web

---

## What Was Completed This Session (2026-04-30 Session 5)

| Commit | What Shipped |
|---|---|
| `7296845` | Feat: "Silver Prime" top-left links to `/` in admin, My Profile, and member profile headers |
| `1aa8215` | Fix: SilverBot chat window — position:absolute with viewport-clamped coordinates (always fully visible) |
| `f8822fa` | Feat: Full Kickstarter page rebuild — countdown timer, 14-tier data, gallery, FAQ accordion, Firestore waitlist |
| `de8d6fc` | Feat: Stretch goals expandable breakdown panels with itemised spend per goal |

**Key decisions this session:**
- Kickstarter launch date set to **Oct 1 2026** (easily changed in `LAUNCH_DATE` const at top of `KickstarterClient.tsx`)
- 14 tiers defined; **4 shown as teaser** on page — full list revealed on launch day
- Waitlist emails saved to Firestore `waitlistEmails` collection (deduped by email)
- Stretch goals show itemised spend breakdown on click — no salary/personal details, only infrastructure + production

**Firestore rules updated (manually in Firebase Console):**
- Added `waitlistEmails` collection: `allow create: if true` (anyone), read/update/delete admin only

**Pending discussion — shipping timeline:**
- User wants conservative, realistic ship dates
- Year 1: Early Bird units only (Pioneer Pack $399 backers first)
- Year 2: ramp up gradually
- Year 3: full scale
- Exact numbers TBD next session

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
| `/kickstarter` | ✅ Live | **Full build** — countdown, gallery, 14 tiers (4 shown), stretch goals, FAQ, waitlist |
| `/api/chat` | ✅ Live | SilverBot AI backend (Groq) |

### Founders Club Routes
| Route | Status | Notes |
|---|---|---|
| `/community` | ✅ Live | Login + tier badge showcase + password reset |
| `/community/signup` | ✅ Live | 3-step signup with proof upload |
| `/community/pending` | ✅ Live | Pending approval waiting screen |
| `/community/feed` | ✅ Live | Real-time chat, tier stats bar, privacy-aware avatars, admin gold ring |
| `/community/me` | ✅ Live | Profile editor, avatar/banner, investments, DM inbox + reply, password change |
| `/community/profile/[id]` | ✅ Live | Public profile view; private shows anonymous backer; admin sees full profile |
| `/admin` | ✅ Live | Admin login with isAdmin check |
| `/admin/dashboard` | ✅ Live | Overview, pending queue, member table, ban/unban, DM thread, messages inbox |
| `/admin/recovery` | 🔲 TODO | Safe code lockout recovery |

---

## Kickstarter Page — Full Feature List
| Feature | Status |
|---|---|
| Live countdown timer (Oct 1 2026) | ✅ |
| Product image gallery (6 images + thumbnails) | ✅ |
| Stats bar (weight, on-device, size) | ✅ |
| The Problem section | ✅ |
| Pillars (4 differentiators) | ✅ |
| 4 featured reward tiers + "14 tiers on launch day" note | ✅ |
| Stretch goals with expandable itemised breakdown | ✅ |
| FAQ accordion (8 questions) | ✅ |
| Waitlist form → Firestore `waitlistEmails` | ✅ |
| Campaign facts footer | ✅ |
| Shipping timeline (years 1/2/3) | 🔲 TODO — discuss next session |
| Email confirmation on signup | 🔲 TODO |

---

## Firebase Project
| Resource | Status | Notes |
|---|---|---|
| Project ID | `silverprime-founders` | Blaze plan |
| Firestore | ✅ Live | Updated rules include `waitlistEmails` |
| Storage | ✅ Live | US-CENTRAL1 |
| Auth | ✅ Live | `silverprime.app` added to authorized domains ✅ |

### Current Firestore Rules
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
    match /waitlistEmails/{docId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
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

## Domain & Hosting
| Item | Status |
|---|---|
| `silverprime.app` | ✅ Live — purchased via Netlify, HTTPS active |
| `silverprime.netlify.app` | ✅ Live — fallback URL |
| Firebase Auth authorized domain | ✅ `silverprime.app` added |

---

## Netlify Environment Variables
| Variable | Status |
|---|---|
| `GROQ_API_KEY` | ✅ Set (secret) |
| `NEXT_PUBLIC_FIREBASE_*` (6 vars) | ✅ All set |
| `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES` | ✅ Set |
| `ADMIN_SAFE_CODE` | ⚠️ NOT YET SET — needed for `/admin/recovery` |

---

## Admin Account
- `isAdmin: true` · `isVerified: true` · `highestTierId: "lead-investor"` · `highestTierLevel: 9`

---

## Pending Work — Do This Next

**1. Kickstarter shipping timeline** — discuss and add a Year 1/2/3 section to `/kickstarter`
- Year 1: Early Bird / Pioneer Pack only (conservative)
- Year 2: gradual ramp
- Year 3: full production scale
- User wants no over-promising

**2. `/admin/recovery`** — safe code lockout recovery page; add `ADMIN_SAFE_CODE` to Netlify env vars

**3. Email confirmation** — send confirmation email when someone joins the waitlist

**4. Full Kickstarter tier reveal** — on launch day, swap the teaser to show all 14 tiers

**5. Email backend for /#waitlist (homepage)** — wire to same Firestore collection

---

## Key Config in Code
| Item | Location | Value |
|---|---|---|
| Kickstarter launch date | `src/app/kickstarter/KickstarterClient.tsx` line ~11 | `2026-10-01T10:00:00Z` |
| Featured tiers (4 shown) | Same file — `featured: true` flag on each tier | Pioneer $399, Pro Bundle $599, Innovator $999, Founding Partner $2.5K |
| SilverBot knowledge base | `src/data/silverbot-knowledge.ts` | Edit to update AI answers |

---

## Key Product Decisions On Record
| Decision | Rationale |
|---|---|
| Android-only | iOS cancelled, not deferred |
| No custom token | Solana marketplace uses $SOL only |
| AIPC pricing held until Kickstarter | All pages point to /kickstarter |
| Kickstarter-only funding | No VC, no angels, no grants |
| Domain | `silverprime.app` via Netlify — $16.99/yr |
| Shipping — Year 1 conservative | Early Bird only; ramp Years 2–3 |
| Firebase API keys | NOT secret — protected by security rules |
| Founders Club | `/community` routes on same domain |

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
