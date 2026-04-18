# Silver Prime — Scope: Stages 3.3 → 7

Companion scope doc for the **mobile app repo** (not this website). Drop into the app repo root as `SCOPE.md` or paste into your code session. Derived from the honest-copy pass landed on [silverprime.netlify.app](https://silverprime.netlify.app) on 2026-04-18.

---

## 0. Baseline — what's already shipped

| Stage | Status | Notes |
|---|---|---|
| 3.1 — Groq cloud inference via user key | ✅ | `llama-3.1-8b-instant` adapter, Keystore-wrapped key |
| 3.2 — Streaming + persistence | ✅ | XHR-SSE parser, AbortController, WatermelonDB + SQLCipher, `conversation_sessions` / `conversation_turns` |

Everything below is new. Order is intentional — each stage unblocks the next.

---

## 1. Stage 3.3 — On-device Phi-3-mini

**Goal:** full conversation with zero network when the user picks it, or when the router picks it.

**Deliverables**
- `llama.rn` native module wired for arm64-v8a + armeabi-v7a
- Phi-3-mini-4k-instruct Q4_K_M (~2.2 GB) first-run download w/ resumable fetch + SHA-256 verify
- Model file lives in app's private storage; never synced, never backed up to cloud
- Inference adapter matching the existing `ChatAdapter` interface used by the Groq path
- Smart-router v1: heuristic classifier (length, keyword tags, turn count, has-image) → `local | cloud | user-preference`
- Settings screen: `Always local` / `Always cloud` / `Smart (default)`

**Risks**
- 2.2 GB download on cellular — gate behind Wi-Fi-only toggle by default
- Cold-start latency on low-RAM devices — add 6 GB RAM recommendation to device check
- Battery impact — cap max tokens per turn locally; expose in settings

**Exit criteria:** user in airplane mode completes a 10-turn conversation with reasonable latency on a Pixel 7-class device.

---

## 2. Stage 3.5 — Renameable persona

**Goal:** every system-prompt-bearing surface respects the user's chosen assistant name.

**Deliverables**
- Persona record in encrypted store: `{ name: string, createdAt: number }`
- Default `"Prime"` written on first launch; editable in onboarding and Settings
- System-prompt templater reads persona name at turn construction time (not cached)
- Notification titles, greeting strings, voice wake-word slot all pull from the same source
- Backup/restore preserves persona

**Risks**
- Voice wake-word retraining — defer actual wake-word work to Stage 3.4 voice pass; Stage 3.5 only wires the plumbing

**Exit criteria:** rename "Prime" → "Jarvis" in Settings; next turn's system prompt reflects it; notification title updates on next generation.

---

## 3. Stage 4 — Self-improvement sandbox + vision

Two parallel tracks; ship 4a first.

### 3a. Recursive self-improvement (JS-layer only)

**Goal:** assistant drafts a new capability, runs it in an isolated Hermes runtime, user approves, capability persists.

**Deliverables**
- Skill spec: `{ id, name, version, entry: "index.js", fixtures: [...], permissions: [...] }`
- Code-gen pipeline: user's API key (Groq / Anthropic / OpenAI / Gemini) drafts a JS module matching the spec
- **Static-analysis gate** (blocks promotion):
  - No `eval`, `Function`, `require`, `import()`, `__proto__`, `globalThis.*` escape
  - No access to host-app modules outside an allow-listed `silverprime/*` namespace
  - AST walker, not regex — use `@babel/parser` / `acorn`
- Hermes isolated runtime: spawn a fresh isolate, inject allow-listed bindings only, run fixtures
- Approval UI: diff view, fixture results, permission list, `Approve` / `Reject` / `Run again`
- Persisted skill store in app private storage; loaded at launch after signature check
- 30-day rollback: keep previous version, one-tap revert
- Audit log of every skill run (local, encrypted)

**Risks — read carefully**
- **Play Store Policy §4.10 (dynamic code loading)** — Google bans apps that fetch and execute new code from a server. Our defense: the code is generated *by the user's own API call* using *their own key*, then executed locally. Still a grey area. Mitigations:
  - Skills never ship pre-bundled or server-delivered in the Play build
  - Skill feature is gated behind a "developer mode" toggle in the Play-Store variant
  - Pro channel (Stage 6) is the primary surface for skill authorship
- **Sandbox escape** — Hermes is not a security boundary by design; treat the isolate as defense-in-depth, not a hard wall. The real gate is the static analyzer + user approval + permission allow-list

### 3b. Vision / ML Kit

**Goal:** on-device face embedding, text recognition, barcode — all via ML Kit, zero network.

**Deliverables**
- ML Kit wrapper: face detection, text recognition (OCR), barcode
- Face embedding storage: local, encrypted, never transmitted
- Enrolment flow with explicit "your face never leaves this device" disclosure
- One-tap wipe: Settings → Privacy → Delete biometric data

**Exit criteria (Stage 4 overall):** user asks "summarize this receipt", assistant OCRs the image locally, writes a skill to categorize receipts, runs it in the sandbox, user approves, skill becomes available in future turns.

---

## 4. Stage 6 — Pro channel (sideload APK + update manifest)

**Goal:** power-user distribution path that bypasses Play Store for faster releases and full self-improvement surface.

**Deliverables**
- **Signed APK build pipeline** — separate flavor (`proRelease`) from Play Store flavor (`playRelease`)
- **Update manifest endpoint** at `silverprime.app/updates/pro/manifest.json`:
  ```json
  {
    "latestVersion": "1.4.2",
    "minSupportedVersion": "1.3.0",
    "apkUrl": "https://silverprime.app/updates/pro/silverprime-1.4.2.apk",
    "sha256": "…",
    "signature": "…",
    "releasedAt": "2026-05-14T00:00:00Z",
    "notes": "…"
  }
  ```
- In-app updater:
  - Poll manifest daily (configurable)
  - Verify signature against bundled public key
  - Download APK, verify SHA-256
  - Invoke `ACTION_INSTALL_PACKAGE` with `REQUEST_INSTALL_PACKAGES` permission → system dialog
  - User always confirms the install
- **Signing key custody** — hardware key (YubiKey or GCP KMS); never on CI
- Kill-switch: if signature check fails, refuse install + alert user

**What the Pro channel does NOT do**
- No silent install (Android forbids for non-system apps — don't try to work around this)
- No forced updates — user can defer indefinitely
- No separate feature set that's hidden from Play users — same features, different release cadence. Exception: developer-mode skill authorship UI can be Pro-exclusive if Play review pushes back

**Risks**
- Users installing from unknown sources must explicitly enable per-source permission — expect ~20% drop-off at this step; mitigate with clear instructions + screenshot guide
- Signing key compromise = worst-case scenario — KMS + quorum for releases

**Exit criteria:** existing Pro user opens app, sees "Update available", taps → system install dialog → tapping Install updates the app.

---

## 5. Stage 7 — Solana skill marketplace

**Goal:** users publish self-authored skills; other users buy them in $SOL; authors earn royalties on every sale.

**No custom token.** Payments and royalties denominate in $SOL. This removes securities risk and avoids the "why does this app have its own coin" trust tax.

### Architecture

```
Author device          Marketplace frontend        Solana (mainnet-beta)
─────────────          ────────────────────        ─────────────────────
Approves skill  ───►   Skill uploader UI     ───►  Anchor program:
Signs with wallet      Pin to IPFS (Pinata)         - register_skill
                       Hash + CID → on-chain        - purchase_skill
                                                    - claim_royalty
Buyer device   ◄───   Marketplace browser   ◄───  IPFS (Filebase + Pinata)
Wallet approves        Payment intent                Skill bundle (JS + manifest + sig)
Downloads bundle       Fetch CID                     Content-addressed
Verifies signature
Loads into skill store
```

### Deliverables

- **Anchor program (Rust)** with instructions:
  - `register_skill(cid, price_lamports, royalty_bps, author)` — author lists a skill
  - `purchase_skill(skill_pubkey)` — buyer pays; program transfers to author + marketplace fee PDA
  - `claim_royalty` — on resale (v2), accrue to author
  - Program-derived accounts for skill records; rent-exempt
- **IPFS pinning** — Pinata + Filebase as redundant pinners; CID is canonical skill identity
- **Wallet integration** — Mobile Wallet Adapter for Phantom, Solflare, Backpack
- **Author signing** — each skill bundle signed by the author's Solana keypair; buyer verifies signature before loading
- **Marketplace UI (web + in-app)** — browse, search, preview fixtures, one-click install
- **Royalty enforcement** — marketplace-enforced at payment time, NOT protocol-mandated. Copy must say "marketplace-enforced" — don't replicate the `MagicEden` / `Tensor` royalty drama
- **Fee transparency** — marketplace fee (suggest 2.5%) displayed upfront; Solana network fee (~5000 lamports ≈ $0.0005) shown separately

### Risks

- **Play Store Policy §4.10 (again)** — a marketplace of downloadable code is almost certainly Play-forbidden. **Marketplace is Pro-channel-only.** The Play Store build either hides the marketplace entirely or surfaces read-only browsing with "install requires Pro channel" gating
- **Malicious skills** — same static-analysis gate as Stage 4, plus:
  - Reputation score per author (purchases, reports, age)
  - Report-and-delist flow
  - Anchor program emits a `skill_delisted` event that client respects at next sync
- **$SOL price volatility** — display prices in both $SOL and USD (Pyth oracle); buyer pays in $SOL
- **Wallet UX friction** — Mobile Wallet Adapter is mature but users unfamiliar with crypto will churn. Provide a "gift skill" flow so non-crypto users can still receive skills paid for by a friend

**Exit criteria:** author on Pro channel publishes a skill → appears on the marketplace → second Pro user buys with Phantom → skill installs → author's wallet shows the $SOL minus fees.

---

## 6. Cross-cutting concerns

### Security
- Every stage extends the Android Keystore-wrapped key model — no regressions
- Code-signing: separate keys for Play flavor and Pro flavor; both in KMS
- Skill bundles: Ed25519 signature by author + optional marketplace co-sign
- Threat model doc: `docs/threat-model.md` — update per stage

### Testing
- Stage 3.3: offline-mode E2E on CI emulator with Wi-Fi disabled
- Stage 4: sandbox fuzz harness that throws adversarial JS at the static analyzer + runtime
- Stage 6: manifest-poisoning tests (bad signature, downgrade attack, truncated APK)
- Stage 7: local Solana validator (`solana-test-validator`) for Anchor tests; CI in GitHub Actions

### Release gating
Each stage ships behind a remote feature flag read from `silverprime.app/flags.json`. Flags fail closed (off) if the manifest is unreachable. No stage is silently enabled.

---

## 7. Implementation order

```
Stage 3.3 ──► Stage 3.5 ──► Stage 4a ──► Stage 6 ──► Stage 4b ──► Stage 7
(on-device)   (persona)     (sandbox)    (Pro APK)   (vision)     (marketplace)
```

**Why this order**
- 3.3 unblocks the "offline" promise — biggest user-visible win
- 3.5 is cheap and lets 4a's skills reference persona in their prompts
- 4a ships sandbox **before** 4b vision so the first skill demo doesn't depend on camera
- 6 comes **before** 7 because Stage 7's marketplace lives on the Pro channel, not Play
- 4b vision after 6 so vision-using skills can be distributed via marketplace from day 1
- 7 last — biggest integration surface, biggest risk, depends on everything above

---

## 8. Open decisions (blockers before implementation)

1. **Skill permission model** — what's the permission vocabulary? (`net.fetch`, `storage.read`, `persona.read`, `clipboard.write`, etc.) Ship a v1 list with Stage 4a, expand later
2. **Marketplace fee** — 2.5% vs 5% vs flat 0.01 SOL per sale? Decide before Stage 7 design freeze
3. **Pro channel price** — one-time unlock? Tied to Play Premium unlock? Free-with-skill-purchase? Recommend: one-time $19 unlock that also grants Premium on Play
4. **IPFS pinning cost** — Pinata free tier caps at 1 GB. Budget for paid plan at ~1000 skills scale
5. **Solana cluster** — mainnet-beta from day 1, or devnet for a beta phase? Recommend devnet beta with real-looking fake $SOL for the first 100 authors

---

## 9. What this scope deliberately excludes

- iOS — cancelled, not deferred
- Desktop / web app — the phone is the product
- Voice wake-word training — Stage 3.4, separate scope doc
- Backup-to-cloud — privacy-incompatible with current architecture
- Multi-device sync — same reason
- Custom L1 / L2 / own token — explicitly rejected; $SOL only
