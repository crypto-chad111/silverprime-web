# Silver Prime Showcase Website — Update Prompt

Use this prompt in your separate Claude Code session for the showcase website at
**https://silverprime.netlify.app/**

---

## Prompt to paste into your website session:

```
I'm updating the Silver Prime showcase website at https://silverprime.netlify.app/

Silver Prime has evolved significantly. Here is the full, current product story:

---

## What Silver Prime Is

Silver Prime is a freemium Android AI assistant — a personal AI companion that
lives on your phone. It is NOT a chatbot you visit in a browser. It is an
always-on, always-learning AI that knows you, listens for your voice, and works
even without an internet connection.

Key differentiators:
1. Fully private on-device AI (Phi-3-mini, 2.2 GB, runs without internet)
2. Cloud AI fallback (Groq — Llama 3.1, Mixtral) when you need more power
3. "Hey Silver" wakeword — always listening in the background (like Alexa, but yours)
4. Voice I/O — speak to it, it speaks back (Whisper STT + Android TTS)
5. Context awareness — sees which app you're using, surfaces smart suggestions
6. Persistent memory — conversation history survives restarts (WatermelonDB)
7. No subscription — one-time Premium unlock for advanced features
8. Future: AIPC companion drone (under 250 g, Wi-Fi Direct, Silver Prime is the AI brain)

---

## Technical Stack (for the "Under the Hood" or tech-savvy section)

- React Native 0.74 (Android-only, no iOS)
- On-device LLM: Phi-3-mini-4k Q4_K_M via llama.rn (llama.cpp bindings)
- Cloud LLM: Groq API — Llama 3.1 8B / 70B, Mixtral 8×7B (streaming)
- STT: Whisper tiny.en via whisper.rn (on-device, ~75 MB)
- TTS: Android TextToSpeech (no download needed)
- Wakeword: Porcupine by Picovoice ("Hey Silver" — ALEXA keyword in prototype)
- Database: WatermelonDB + op-sqlite + SQLCipher (encrypted)
- Storage: MMKV + Android Keystore (API keys stored securely)
- Theming: Dark / Dim / Bright modes with animated Bubble Orb

---

## App Feature List (what the current build can do)

### Core Chat
- Streaming AI responses (token by token, Groq or Phi-3-mini)
- Smart routing: complex prompts → cloud, simple prompts → local
- Full conversation history with session management
- "New Chat" action, browse & restore past sessions
- Share sessions as Markdown

### Voice
- Hold mic button to record, release to transcribe (Whisper STT)
- Assistant speaks every reply (Android TTS)
- "Hey Silver" background wakeword — works with screen off

### Intelligence & Awareness
- Context-aware: detects active app, surfaces relevant suggestions
- Notification awareness: sees incoming notifications for proactive help
- Proactive suggestions toggle (user-controlled)

### Settings & Customisation
- Groq API key management (saved in Android Keystore)
- Model picker: Fast (Llama 3.1 8B) / Smart (Llama 3.3 70B) / Long (Mixtral 8×7B)
- Phi-3-mini download with progress bar (~2.2 GB)
- Routing mode: Local / Cloud / Smart (auto)
- Theme: Dark / Dim / Bright
- Wakeword toggle + Picovoice key management
- Context awareness toggle (Android Accessibility)
- Premium unlock (one-time)

### Coming Soon (Premium / Next Stages)
- Vision: photo description via Moondream-2 + scene classification
- Face recognition: enrol family/friends, Silver Prime recognises them
- Self-improvement sandbox: Silver Prime writes and proposes new capabilities
- Google Drive backup: encrypted conversation history
- AIPC companion drone: Wi-Fi Direct, HD video, Silver Prime is the AI brain

---

## Pricing Model

- **Free**: Chat (Groq key required), limited history, basic voice
- **Premium** (one-time, ~$9.99): On-device AI, unlimited history, wakeword,
  vision, face recognition, self-improvement, cloud backup

---

## AIPC Drone (Future Product — mention as "coming soon")

The AIPC is a lightweight AI-powered companion drone designed to work alongside
Silver Prime. Silver Prime on your phone IS the AI brain — the drone is a
sensor/actuator peripheral.

Key specs:
- Under 250 g (no FAA registration required for recreational use)
- 10–15 minutes flight time
- HD camera with RTSP stream to Silver Prime
- Microphone array + speaker (voice through the drone)
- Outdoor GPS + indoor altitude hold
- Connects via Wi-Fi Direct — no router needed
- Target retail price: $199–249 USD
- Commercial launch target: 2027

---

## Website Update Tasks

Please update the showcase website with the following changes:

1. **Hero section**: Update headline and subheadline to reflect the full vision.
   Suggested headline: "Your AI. Always with you."
   Subheadline: "Silver Prime is a private, voice-powered AI assistant for Android.
   On-device intelligence. Always listening. Always learning."

2. **Features section**: Update or create feature cards for all 7 core features
   listed above (Private AI, Cloud fallback, Wakeword, Voice I/O, Context
   awareness, Persistent memory, One-time Premium).

3. **"How it works" or technical section**: Add a clean visual breakdown of
   the hybrid AI architecture:
   - Your phone → Phi-3-mini (private, offline)
   - Your phone → Groq cloud (fast, powerful)
   - Smart routing between the two

4. **AIPC teaser section**: Add a "Coming Soon" section for the drone.
   Show the key stat: under 250 g, Silver Prime is the brain, $199–249.
   Use language like: "Silver Prime. Now it can fly."

5. **Pricing section**: Add a clear Free vs Premium comparison.

6. **CTA**: Update call-to-action to "Join the waitlist" or "Get early access"
   with a simple email capture form (or link to a Typeform/Google Form).

7. **Tech stack badges** (optional, for credibility): Phi-3-mini, Llama 3.1,
   Whisper, Porcupine, React Native, WatermelonDB.

Keep the existing visual style and branding. Silver Prime's colour palette is
deep dark backgrounds with silver/blue accent glows. The brand feel is
premium, futuristic, personal — like having your own Jarvis.

Do not change the domain or Netlify deployment settings. Just update the
page content and structure.
```

---

## Changes Summary (for your reference when briefing the website session)

| What changed | Details |
|---|---|
| Product name | Silver Prime (unchanged) |
| Platform | Android-only, React Native 0.74 |
| AI architecture | Hybrid: Phi-3-mini (on-device) + Groq (cloud), smart routing |
| Voice stack | Whisper STT + Android TTS + Porcupine wakeword |
| Context awareness | Accessibility service sees foreground app + notifications |
| Memory | WatermelonDB encrypted, full session history |
| New product: AIPC drone | Under 250 g, Silver Prime is the AI brain, Wi-Fi Direct |
| Pricing | Free + one-time Premium (~$9.99) |
| Drone pricing | $199–249 hardware, commercial launch ~2027 |
| Key differentiator | Fully private on-device AI, no subscription |
