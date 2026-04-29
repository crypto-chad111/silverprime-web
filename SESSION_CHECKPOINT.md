# Session Checkpoint
**Project:** Silver Prime — AIPC Drone & Android AI Assistant
**Last updated:** 2026-04-29 (Session 2)
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

## What Was Completed This Session (2026-04-29 Session 2)

| Commit | What Shipped |
|---|---|
| `d86a228` | "Founders Club 💎" link added to main Nav.tsx |
| `64f606e` | Fix: username `@` prefix overlap in signup form |
| `261453f` | Admin login page + full admin dashboard (overview, pending queue, member table, ban/unban, DM) |

**Also completed this session:**
- Fixed Netlify secrets scanning failure — added `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES` env var
- Tested community pages end-to-end: signup ✅, feed ✅, my profile ✅, avatar/banner upload ✅, password change ✅
- Confirmed Firebase is live and writing data correctly to Firestore

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
| `/community` | ✅ Live | Login page + tier badge showcase + password reset |
| `/community/signup` | ✅ Live | 3-step: account → profile → investment proof upload |
| `/community/pending` | ✅ Live | Waiting screen for unverified applicants |
| `/community/feed` | ✅ Live | Real-time Firestore chat, tier stats bar, tested working |
| `/community/me` | ✅ Live | Profile editor, avatar/banner upload, investment dashboard, privacy toggle |
| `/community/profile/[id]` | 🔲 TODO | View another member's public profile |
| `/admin` | ✅ Live | Admin login — checks `isAdmin: true` in Firestore |
| `/admin/dashboard` | ✅ Live | Overview stats, pending queue + approve/deny, member table + search, ban/unban, DM |
| `/admin/recovery` | 🔲 TODO | Safe code lockout recovery |

### Key Files
| File | Status | Notes |
|---|---|---|
| `src/lib/firebase.ts` | ✅ Live | Firebase client SDK init |
| `src/lib/types.ts` | ✅ Live | Shared TypeScript types |
| `src/lib/useAuth.ts` | ✅ Live | Real-time auth + profile hook |
| `src/data/tiers.ts` | ✅ Live | 9-tier catalogue (Supporter → Lead Investor) |
| `src/components/community/TierBadge.tsx` | ✅ Live | Coloured tier badge component |
| `src/app/admin/AdminLoginClient.tsx` | ✅ Live | Admin login with isAdmin check |
| `src/app/admin/dashboard/AdminDashboardClient.tsx` | ✅ Live | Full admin dashboard |
| `.env.local` | ✅ Local only | Firebase config — gitignored |

---

## Firebase Project
| Resource | Status | Notes |
|---|---|---|
| Project ID | `silverprime-founders` | Blaze plan |
| Firestore | ✅ Live | eur3 europe-west, production rules |
| Storage | ✅ Live | US-CENTRAL1, production rules |
| Auth | ✅ Live | Email/Password enabled |

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
| `ADMIN_SAFE_CODE` | ⚠️ NOT YET SET — agree passphrase when building /admin/recovery |

---

## How to Set Up Your Admin Account

After Netlify deploys:
1. Go to `/community/signup` and create your real admin account
2. In Firestore console → `profiles` collection → find your UID doc → set:
   - `isAdmin: true`
   - `isVerified: true`
   - `highestTierId: "lead-investor"`
   - `highestTierLevel: 9`
   - `totalInvestedUsd: 15000`
3. In `investments` collection → find your doc → set `status: "approved"`
4. Log in at `/admin` with your email/password → lands on dashboard

---

## Exact Pending Work — Do This Next

**1. `/community/profile/[id]`** — public profile view for any member
- Shows: avatar, banner, display name, bio, tier badge, total invested (if public)
- Private profiles show only tier badge + "Anonymous backer"
- Linked from feed message avatars and member list

**2. `/admin/recovery`** — safe code lockout recovery
- Admin enters `ADMIN_SAFE_CODE` env var value + registered email
- Generates one-time magic link or temp password reset
- Agree on the passphrase value and add `ADMIN_SAFE_CODE` to Netlify

**3. Fix feed avatar click → 404**
- Avatar/name click in feed currently links to `/community/profile/[id]` which 404s
- Either build the profile page first, or temporarily disable the link

**4. Domain name purchase**
- User is shopping on Namecheap
- Top picks: `silverprime.ai` (best), `silverprime.app` (cheaper), `silverprime.io`
- Once purchased: add custom domain in Netlify → Site configuration → Domain management

**5. Kickstarter campaign page — full build**
- Countdown timer, finalised tier pricing, email backend

**6. Email backend**
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
| Firebase (not Supabase) | User already had a Firebase account; Supabase project was paused >90 days |
| Founders Club = /community | Same domain, not separate |
| Platform name | Silver Prime Founders Club |
| Admin safe code | Agreed privately at build time, stored only as Netlify env var |
| Firebase API keys | NOT secret — protected by security rules + authorized domains, not key secrecy |
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
