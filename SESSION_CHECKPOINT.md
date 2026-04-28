# Session Checkpoint
**Project:** Silver Prime — AIPC Drone & Android AI Assistant
**Last updated:** 2026-04-28
**Repo:** https://github.com/crypto-chad111/silverprime-web
**Live site:** https://silverprime.netlify.app
**Working directory:** C:\dev\SilverPrime-Web

---

## What This Project Is

**Silver Prime** is a freemium Android AI assistant (React Native 0.74, Android-only). Hybrid on-device AI (Phi-3-mini) + cloud fallback (Groq). "Hey Silver" wakeword, Whisper STT, encrypted persistent memory, context awareness via AccessibilityService. One-time Premium unlock ~$14.99. No subscription.

**The website** (this repo) is the marketing/showcase site built in Next.js 14 App Router + TypeScript + Tailwind + Framer Motion. Auto-deploys to Netlify from the `main` branch.

**AIPC Companion Drone** — a ring/toroid-form drone (~130mm, <250g, Linux SBC, HD camera, Wi-Fi Direct) that pairs with Silver Prime. The phone IS the brain. The drone is the eyes. Coming 2027.

---

## What Was Completed This Session

| Commit | What Shipped |
|---|---|
| `e74cf29` | Both shoulder platform images activated in gallery (`available: false` → `true`). All 8 AIPC gallery slots now live. Also added `hero-phone.png`, `howitworks-routing.png`, `skill-economy.png` to git. |
| `4937b42` | `CLAUDE.md` created — session failsafe. Auto-loaded by Claude Code on every new session. |
| `6d58a55` | `aipc-drone-internal.png` replaced with correct ring/toroid exploded-view image. |
| `51e968c` | `.gitignore` updated — `.claude/settings.local.json` and `.claude/worktrees/` now ignored permanently. |
| `060a9a8` | Git workflow rules written into `CLAUDE.md` — never commit to main, always use feature branch + sandbox. |
| `906b3fe` | `CLAUDE.md` updated with Kickstarter plan status and next steps. |

**Non-code deliverables created (in project folder, NOT committed to git):**
- `KICKSTARTER_PLAN.md` — full business plan: Saudi Arabia HQ, $3–5M budget, 14-tier Kickstarter structure, facility/equipment/staffing/salary breakdown, 5-year milestone budget
- `KICKSTARTER_CAMPAIGN_NARRATIVE.md` — campaign story, full page copy, 90-sec founder video script, 5-email pre-launch sequence, messaging pillars

---

## Current State of Every File That Matters

### Website Source
| File | Status | Notes |
|---|---|---|
| `src/app/page.tsx` | ✅ Live | Home page — Hero, HowItWorks, Pillars, SkillEconomyTeaser, AIPCTeaser, Pricing, Waitlist |
| `src/app/aipc/page.tsx` | ✅ Live | Full AIPC drone page — all 8 gallery slots active |
| `src/app/roadmap/page.tsx` | ✅ Live | Full roadmap |
| `src/components/AIPCGallery.tsx` | ✅ Live | Reusable gallery — glowing tiles (available:true) vs placeholder (available:false) |
| `src/components/AIPCTeaser.tsx` | ✅ Live | Home page teaser — all 8 slots active |
| `src/components/Pricing.tsx` | ✅ Live | Three-column pricing: Free / Premium / AIPC |
| `content/roadmap.ts` | ✅ Live | Single source of truth for roadmap milestones |

### Images (`public/images/`)
| File | Status |
|---|---|
| `aipc-drone-solo.png` | ✅ Live |
| `aipc-drone-user.png` | ✅ Live |
| `aipc-drone-internal.png` | ✅ Live — **NEW** ring/toroid exploded view (replaced puck shape) |
| `aipc-drone-outdoor.png` | ✅ Live |
| `aipc-drone-lens.png` | ✅ Live |
| `aipc-drone-pairing.png` | ✅ Live |
| `aipc-shoulder-charging.png` | ✅ Live — **NEW this session** |
| `aipc-shoulder-flight.png` | ✅ Live — **NEW this session** |
| `hero-phone.png` | ✅ Live |
| `howitworks-routing.png` | ✅ Live |
| `skill-economy.png` | ✅ Live |

### Business Documents (not in git)
| File | Status |
|---|---|
| `KICKSTARTER_PLAN.md` | ✅ Complete — planning stage |
| `KICKSTARTER_CAMPAIGN_NARRATIVE.md` | ✅ Complete — planning stage |

### Session & Context Files
| File | Location | Notes |
|---|---|---|
| `CLAUDE.md` | Repo root | Auto-loaded each session. Full project context. |
| `SESSION_CHECKPOINT.md` | Repo root | This file. Updated each `/checkpoint`. |
| `KICKSTARTER_PLAN.md` | Repo root | Business plan — not committed |
| `KICKSTARTER_CAMPAIGN_NARRATIVE.md` | Repo root | Campaign copy — not committed |
| Plan file | `C:\Users\Super ADMIN\.claude\plans\both-images-have-been-hazy-quasar.md` | Image prompts + implementation plans |

---

## Exact Pending Work — Do This Next

**1. Kickstarter campaign — refine and extend**
- Add founder bios to `KICKSTARTER_CAMPAIGN_NARRATIVE.md` (need real names/backgrounds)
- Brief a designer on the Kickstarter page layout using the copy in Part 2
- Plan the campaign video shoot — founder on camera, working prototype required
- Start building the pre-launch email list (target: 15,000+ before Day 1)

**2. Website — Kickstarter landing page**
- Create `/kickstarter` route on silverprime.app
- Pre-launch waitlist capture with email + countdown timer
- Use campaign copy from `KICKSTARTER_CAMPAIGN_NARRATIVE.md`
- Feature branch: `feature/kickstarter-landing-page`

**3. Saudi Arabia company setup research**
- KAEC (King Abdullah Economic City) vs NEOM Oxagon — confirm which is operational for Year 1
- Contact KAEC business authority for industrial unit availability and pricing
- Identify Saudi legal counsel for LLC formation

**4. Image — internal breakdown prompt saved**
- New `aipc-drone-internal.png` has been replaced ✅
- If a better version is needed, use the v3 prompt in the plan file

---

## Key Product Decisions On Record

| Decision | Rationale |
|---|---|
| Android-only | iOS cancelled, not deferred |
| No custom token | Solana marketplace uses $SOL only |
| Pro APK (Stage 6) before marketplace (Stage 7) | Play Store policy: marketplace is Pro-only |
| AIPC price $499–$599 | 50%+ margin at $280 COGS; drops to $299–$399 at 10K+ units |
| Saudi Arabia HQ | Vision 2030, 0% personal tax, cheapest industrial real estate, KAEC operational |
| Kickstarter-only funding | No VC, no angels, no grants — community funded |
| Kickstarter minimum goal: $1.5M | Covers lean Year 1 (1,000 units, core team, facility) |
| Kickstarter full potential: ~$3.1M | 14 tiers including $50K Platinum Founder |
| Single location: Saudi | No phased move — set up in Saudi from Day 1 |
| CEO salary: $15–18K/month tax-free | Covers family of 3 adults comfortably in Saudi |
| Co-CEO salary: $18–22K/month + school allowance | Covers family of 5; $33–60K/yr school fees separate |

---

## How to Resume in a New Session

Paste this into any new Claude Code session in this project:

```
Read CLAUDE.md and SESSION_CHECKPOINT.md, then tell me where we left off and what the next step is.
```

---

## Checkpoint Protocol

To save a new checkpoint at any time, say:

```
/checkpoint
```

Claude will:
1. Review all recent commits and changed files
2. Update this `SESSION_CHECKPOINT.md` with the current state
3. Update `CLAUDE.md` if any pending work items changed
4. Commit both files and push to `main`
