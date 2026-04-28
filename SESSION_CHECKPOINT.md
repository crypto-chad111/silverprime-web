# Session Checkpoint
**Project:** Silver Prime — AIPC Drone & Android AI Assistant
**Last updated:** 2026-04-29
**Repo:** https://github.com/crypto-chad111/silverprime-web
**Live site:** https://silverprime.netlify.app
**Working directory:** C:\dev\SilverPrime-Web

---

## What This Project Is

**Silver Prime** is a freemium Android AI assistant (React Native 0.74, Android-only). Hybrid on-device AI (Phi-3-mini) + cloud fallback (Groq). "Hey Silver" wakeword, Whisper STT, encrypted persistent memory, context awareness via AccessibilityService. One-time Premium unlock ~$14.99. No subscription.

**The website** (this repo) is the marketing/showcase site built in Next.js 14 App Router + TypeScript + Tailwind + Framer Motion. Auto-deploys to Netlify from the `main` branch.

**AIPC Companion Drone** — ring/toroid-form drone (~130mm, <250g, Linux SBC, HD camera, Wi-Fi Direct). Phone IS the brain. Coming Q1 2027. Pricing TBD — held until Kickstarter.

**Silver Prime Founders Club** — gated investor community platform (in progress). Firebase-backed. Routes under `/community` and `/admin`.

---

## What Was Completed This Session (2026-04-29)

| Commit | What Shipped |
|---|---|
| `962d899` | SilverBot floating edge patrol — orb drifts along right+bottom viewport edges every 28s |
| `0f01e74` | Saudi HQ reference removed from Kickstarter stretch goals |
| `c1bd518` | Founders Club Phase 1 — Firebase setup + 5 community routes + TierBadge component |

**Non-code work completed:**
- Firebase project `silverprime-founders` created (Blaze plan)
- Firestore database created (eur3 europe-west)
- Firebase Storage created (US-CENTRAL1)
- Firebase Auth enabled (Email/Password)
- Firestore security rules published (production mode)
- Storage security rules published (proofs/avatars/banners — owner writes, members read)
- `.env.local` created with all Firebase config keys (gitignored)

---

## Current State of Every File That Matters

### Website Routes
| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Live | Home page |
| `/features` | ✅ Live | App features |
| `/aipc` | ✅ Live | Full AIPC drone page |
| `/roadmap` | ✅ Live | App + hardware milestones |
| `/why` | ✅ Live | Comparison matrix |
| `/download` | ✅ Live | APK access |
| `/kickstarter` | ✅ Live | Pre-launch waitlist — Saudi HQ ref removed |
| `/api/chat` | ✅ Live | SilverBot AI backend (Groq) |

### Founders Club Routes (Firebase-backed)
| Route | Status | Notes |
|---|---|---|
| `/community` | ✅ Built | Login page + tier badge showcase + password reset |
| `/community/signup` | ✅ Built | 3-step: account → profile → investment proof upload |
| `/community/pending` | ✅ Built | Waiting screen for unverified applicants |
| `/community/feed` | ✅ Built | Real-time Firestore chat, tier stats bar, Platinum founder profiles |
| `/community/me` | ✅ Built | Profile editor, avatar/banner upload, investment dashboard, privacy toggle |
| `/community/profile/[id]` | 🔲 TODO | View another member's public profile |
| `/admin` | 🔲 TODO | Admin login with TOTP 2FA |
| `/admin/dashboard` | 🔲 TODO | Member table, pending verifications, DMs, ban controls |
| `/admin/recovery` | 🔲 TODO | Safe code recovery flow |

### Key New Files
| File | Status | Notes |
|---|---|---|
| `src/lib/firebase.ts` | ✅ Live | Firebase client SDK init |
| `src/lib/types.ts` | ✅ Live | Shared TypeScript types |
| `src/lib/useAuth.ts` | ✅ Live | Real-time auth + profile hook |
| `src/data/tiers.ts` | ✅ Live | 9-tier catalogue (Supporter → Lead Investor) |
| `src/components/community/TierBadge.tsx` | ✅ Live | Coloured tier badge component |
| `.env.local` | ✅ Local only | Firebase config — gitignored, NOT in repo |

### Firebase Project
| Resource | Status | Notes |
|---|---|---|
| Project ID | `silverprime-founders` | Blaze plan |
| Firestore | ✅ Live | eur3 europe-west, production rules |
| Storage | ✅ Live | US-CENTRAL1, production rules |
| Auth | ✅ Live | Email/Password enabled |

### Netlify Environment Variables Needed
| Variable | Status |
|---|---|
| `GROQ_API_KEY` | ✅ Set |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ⚠️ NOT YET SET — add to Netlify before deploying community |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ⚠️ NOT YET SET |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ⚠️ NOT YET SET |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ⚠️ NOT YET SET |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ⚠️ NOT YET SET |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ⚠️ NOT YET SET |
| `ADMIN_SAFE_CODE` | ⚠️ NOT YET SET — agree passphrase when building admin |

---

## Exact Pending Work — Do This Next

**1. Founders Club — remaining pages (next session priority)**
- `/community/profile/[id]` — public profile view for any member
- `/admin` — admin login with TOTP 2FA enforcement
- `/admin/dashboard` — full admin panel (member table, pending queue, DMs, ban/unban)
- `/admin/recovery` — safe code lockout recovery
- Add "Founders Club" link to main Nav.tsx
- Add Firebase env vars to Netlify (all 6 NEXT_PUBLIC_ vars from .env.local)
- Agree on ADMIN_SAFE_CODE passphrase and add to Netlify

**2. First admin account setup**
- After admin dashboard is built: create an account via /community/signup, then manually set `isAdmin: true` in Firestore console for that UID

**3. Kickstarter campaign page — full build**
- Countdown timer, finalised tier pricing, email backend (Firebase or Mailchimp)

**4. Email backend**
- Wire /kickstarter and /#waitlist forms to real email capture

---

## Key Product Decisions On Record

| Decision | Rationale |
|---|---|
| Android-only | iOS cancelled, not deferred |
| No custom token | Solana marketplace uses $SOL only |
| AIPC pricing held | Not published until Kickstarter campaign finalised |
| HQ location | TBD — Saudi Arabia high on the list but private until finalised |
| Kickstarter-only funding | No VC, no angels, no grants — community funded |
| Firebase (not Supabase) | User already had a Firebase account |
| Founders Club = /community | Same domain, not separate |
| Platform name | Silver Prime Founders Club |
| Admin safe code | Agreed privately at build time, stored only as Netlify env var |
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
3. Update this `SESSION_CHECKPOINT.md`
4. Update `CLAUDE.md` pending work section if anything changed
5. Commit both files to `main` with message: `chore: session checkpoint [date]`
6. Push to origin/main
7. Confirm: "Checkpoint saved and pushed ✅"
