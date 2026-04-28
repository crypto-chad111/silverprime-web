# Silver Prime — Showcase Website

## What this repo is
Next.js 14 (App Router) marketing/showcase site for the Silver Prime Android AI assistant app.
Deployed on Netlify at **https://silverprime.netlify.app/**
Repo: https://github.com/crypto-chad111/silverprime-web

## What Silver Prime is
A freemium Android AI assistant. NOT a web chatbot — an always-on, always-learning AI that lives on the phone.

**Key differentiators:**
- On-device LLM: Phi-3-mini-4k Q4_K_M (~2.2 GB, offline, zero cloud)
- Cloud fallback: Groq (Llama 3.1 8B / 70B, Mixtral 8×7B)
- Smart routing: picks local vs cloud by complexity
- "Hey Silver" wakeword — always listening (Porcupine by Picovoice)
- Voice I/O: Whisper STT + Android TTS
- Context awareness: sees active app + notifications via AccessibilityService
- Persistent memory: WatermelonDB + SQLCipher (encrypted)
- No subscription — one-time Premium unlock
- React Native 0.74, Android-only, no iOS

**Pricing:**
- Free: Groq chat (user supplies key), limited history, basic voice
- Premium (one-time ~$14.99): on-device AI, unlimited history, wakeword, vision, face recognition, self-improvement, cloud backup

## AIPC Companion Drone (Coming 2027)
Future hardware product. Silver Prime phone IS the AI brain — drone is a sensor/actuator peripheral.

**Form factor:** Ring/toroid shape (~130 mm outer diameter, ~25–30 mm height). NOT a disc or puck. Large hollow centre aperture. Four oval rotor vent slots around circumference at 90° intervals. Camera flush-mounted on equator rim wall.

**Specs:**
- < 250 g (no FAA registration required, US)
- 10–15 min flight time
- Wi-Fi Direct (no router needed)
- HD camera → RTSP stream to Silver Prime app
- Mic array + speaker
- GPS outdoor / altitude hold indoor
- Linux SBC onboard (flight control only) — AI runs on phone

**Pricing: ⚠️ TBD — NOT published on site**
All AIPC pricing has been removed from the website. Pricing will be confirmed with the Kickstarter campaign.
Do NOT add prices back until the Kickstarter plan is finalised. Every site reference now points to /kickstarter.

**Shoulder Platform:** slim carbon fibre cross-body harness. Drone lifts off on command, returns to magnetic charging pad on shoulder. Wireless charging on landing, USB-C backup.

## Tech Stack (website)
- Next.js 14 App Router + TypeScript
- Tailwind CSS (dark theme, silver/blue-violet palette)
- Framer Motion (gallery animations, lightbox)
- `content/roadmap.ts` — single source of truth for roadmap milestone data

## Site Structure
```
src/app/
  page.tsx          — Home (Hero, HowItWorks, Pillars, SkillEconomyTeaser, AIPCTeaser, Pricing, Waitlist)
  aipc/page.tsx     — Full AIPC drone page (gallery, capabilities, specs, pricing, roadmap, waitlist CTA)
  roadmap/page.tsx  — Full roadmap (past/present/future + hardware lanes)
  features/         — Features page
  download/         — Download page
  why/              — Why Silver Prime page

src/components/
  Nav.tsx              — Navigation (Features, Roadmap, AIPC, Kickstarter 🚀, Download)
  AIPCGallery.tsx      — Reusable gallery: glowing tiles (available:true) vs placeholder (available:false)
  AIPCTeaser.tsx       — Home page AIPC slim teaser (single image + CTA → /aipc, NO gallery)
  SilverBot.tsx        — Jarvis-style floating AI chatbot widget (every page via layout.tsx)
  Hero.tsx             — Home hero
  HowItWorks.tsx       — Hybrid AI routing explainer
  Pillars.tsx          — Core feature pillars
  Pricing.tsx          — Free + Premium only (AIPC column replaced with Kickstarter teaser)
  SkillEconomyTeaser.tsx
  MilestoneCard.tsx    — Roadmap card
  Orb.tsx / Orb3D.tsx  — Animated 3D orb
  StatusBadge.tsx
  Waitlist.tsx
  Footer.tsx

src/app/api/chat/route.ts   — Edge function: SilverBot AI backend (calls Groq)
src/data/silverbot-knowledge.ts — SilverBot knowledge base — EDIT THIS to update what bot knows
src/app/kickstarter/         — Pre-launch Kickstarter page (KickstarterClient.tsx)
```

## Images (public/images/)
All 8 AIPC concept renders are AI-generated (Midjourney/similar). Final hardware may differ.

| File | Status | Description |
|---|---|---|
| aipc-drone-solo.png | ✅ live | Studio product shot |
| aipc-drone-user.png | ✅ live | Palm hover, scale reference |
| aipc-drone-internal.png | ✅ live | Exploded view — ring/toroid form (replaced puck shape, commit 6d58a55) |
| aipc-drone-outdoor.png | ✅ live | Outdoor GPS flight |
| aipc-drone-lens.png | ✅ live | Camera lens close-up |
| aipc-drone-pairing.png | ✅ live | Pairing with Silver Prime app |
| aipc-shoulder-charging.png | ✅ live | Landed + charging on shoulder platform |
| aipc-shoulder-flight.png | ✅ live | Active scan mode, shoulder platform visible |
| hero-phone.png | ✅ live | Hero section phone mockup |
| howitworks-routing.png | ✅ live | How It Works routing diagram |
| skill-economy.png | ✅ live | Skill economy teaser |

## Roadmap lanes (content/roadmap.ts)
- **past**: Stage 1, 1.5, 2 (done)
- **present**: Stage 3.1, 3.2 (shipped)
- **future**: Stage 3.3 (on-device Phi-3), 3.4 (voice), 3.5 (integrations), 4 (sandbox+vision), 5 (Play launch), 6 (Pro APK), 7 (Solana marketplace)
- **hardware**: AIPC Phase 1–4

## Brand / Design
- Background: `#0A0A0C` (near-black)
- Accent: `#7C5CFF` (blue-violet glow)
- Warning/hardware: amber/gold (`#FBBF24`)
- Feel: premium, futuristic, personal — "Jarvis for everyone"
- Font: display font for headings, clean sans for body

## Pending work
1. **Kickstarter campaign page — full build** — build out `/kickstarter` with finalised pricing tiers, countdown timer to launch, email backend (Mailchimp/ConvertKit/Supabase). Feature branch: `feature/kickstarter-full`
2. **Email backend** — wire /kickstarter and /#waitlist forms to a real email capture service
3. **Founder bios** — add real names/backgrounds to `KICKSTARTER_CAMPAIGN_NARRATIVE.md`
4. **Saudi Arabia company setup** — KAEC contact, legal counsel for LLC formation

## Netlify environment variables
- `GROQ_API_KEY` — set as secret. Powers SilverBot AI chatbot at /api/chat

## Git workflow (IMPORTANT — follow every session)
- **Never commit directly to `main`**
- All work goes on a feature branch: `feature/<short-description>`
- Use a worktree sandbox to build and test before committing
- Run `npm run build` in the sandbox — must pass clean before any commit
- Open a Pull Request when ready → user reviews on GitHub → merges → Netlify deploys
- Delete the sandbox branch after merge
- Auto-generated `claude/*` branches are throwaway sandboxes — delete them after use

## /checkpoint command
When the user types `/checkpoint`, do ALL of the following:
1. Run `git log --oneline -10` to get recent commits
2. Review all changed/new files since last checkpoint
3. Update `SESSION_CHECKPOINT.md` — new commits table, updated file status, revised pending work
4. Update `CLAUDE.md` pending work section if anything changed
5. Commit both files directly to `main` with message: `chore: session checkpoint [date]`
6. Push to origin/main
7. Confirm to user: "Checkpoint saved and pushed ✅"

## Key decisions / history
- Android-only (iOS cancelled, not deferred)
- No custom token — Solana marketplace uses $SOL only
- Pro APK channel (Stage 6) comes before marketplace (Stage 7) — marketplace is Pro-only due to Play Store policy
- All AIPC images marked `available: true` as of commit e74cf29
- AIPC shoulder platform — $49 add-on (magnetic harness, wireless charging)
- **AIPC pricing removed from site** — held until Kickstarter campaign finalised (all pages point to /kickstarter)
- Kickstarter-only funding — no VC, no angels, no grants
- Saudi Arabia single permanent HQ — Vision 2030, 0% personal tax
- SilverBot chatbot added — Groq-powered, knowledge base in `src/data/silverbot-knowledge.ts`
- Netlify auto-deploys from `main` branch on push
