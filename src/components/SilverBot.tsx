"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };
type OrbState = "idle" | "thinking";
type EdgePos = { x: number; y: number; edge: "right" | "bottom" };

// ─── Proactive messages (rotate on each visit) ────────────────────────────────

const PROACTIVE_MESSAGES = [
  "Hi! Need help with Silver Prime? 👋",
  "Questions about the AIPC drone? Ask me!",
  "Curious about the Kickstarter campaign?",
  "Want to know what's shipped vs. planned?",
];

// ─── Floating position helpers ────────────────────────────────────────────────

const ORB_SIZE = 52;
const EDGE_PAD = 24; // gap from viewport edge
const DRIFT_MS = 28000; // drift every 28 seconds

/**
 * Returns ~6 rest positions along the right and bottom edges of the viewport.
 * On mobile (<768 px wide) returns a single bottom-right position so the orb
 * never obstructs small-screen content.
 */
function getEdgePositions(vw: number, vh: number): EdgePos[] {
  if (vw < 768) {
    return [
      { x: vw - ORB_SIZE - EDGE_PAD, y: vh - ORB_SIZE - EDGE_PAD, edge: "bottom" },
    ];
  }
  return [
    { x: vw - ORB_SIZE - EDGE_PAD, y: Math.round(vh * 0.18), edge: "right" },
    { x: vw - ORB_SIZE - EDGE_PAD, y: Math.round(vh * 0.40), edge: "right" },
    { x: vw - ORB_SIZE - EDGE_PAD, y: Math.round(vh * 0.62), edge: "right" },
    { x: vw - ORB_SIZE - EDGE_PAD, y: Math.round(vh * 0.82), edge: "right" },
    { x: Math.round(vw * 0.60), y: vh - ORB_SIZE - EDGE_PAD, edge: "bottom" },
    { x: Math.round(vw * 0.35), y: vh - ORB_SIZE - EDGE_PAD, edge: "bottom" },
  ];
}

// ─── Jarvis-style SVG Orb ─────────────────────────────────────────────────────

function SilverBotOrb({ state, size = 52 }: { state: OrbState; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.42; // outer arc
  const r2 = size * 0.30; // middle arc
  const r3 = size * 0.18; // inner arc
  const rc = size * 0.09; // centre dot

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Glow bloom */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.55) 0%, rgba(124,92,255,0) 72%)",
          filter: "blur(6px)",
          animation: state === "thinking"
            ? "sp-pulse-fast 1.2s ease-in-out infinite"
            : "sp-pulse 3s ease-in-out infinite",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Outer ring: slow clockwise rotation ── */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: state === "thinking"
              ? "sp-spin-cw 2s linear infinite"
              : "sp-spin-cw 8s linear infinite",
          }}
        >
          {/* Dashed arc — 270° of 360° */}
          <circle
            cx={cx} cy={cy} r={r1}
            stroke="rgba(124,92,255,0.55)"
            strokeWidth="1.2"
            strokeDasharray={`${r1 * Math.PI * 1.5} ${r1 * Math.PI * 0.5}`}
            strokeLinecap="round"
          />
          {/* Four small dots at 90° intervals */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={cx + r1 * Math.cos(rad)}
                cy={cy + r1 * Math.sin(rad)}
                r="1.4"
                fill="rgba(124,92,255,0.9)"
              />
            );
          })}
        </g>

        {/* ── Middle ring: counter-clockwise ── */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: state === "thinking"
              ? "sp-spin-ccw 1.5s linear infinite"
              : "sp-spin-ccw 5s linear infinite",
          }}
        >
          {/* Three arc segments */}
          <circle
            cx={cx} cy={cy} r={r2}
            stroke="rgba(167,139,255,0.65)"
            strokeWidth="1.5"
            strokeDasharray={`${r2 * Math.PI * 0.55} ${r2 * Math.PI * 0.12} ${r2 * Math.PI * 0.55} ${r2 * Math.PI * 0.12} ${r2 * Math.PI * 0.55} ${r2 * Math.PI * 0.11}`}
            strokeLinecap="round"
          />
        </g>

        {/* ── Inner ring: faster clockwise ── */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: state === "thinking"
              ? "sp-spin-cw 1s linear infinite"
              : "sp-spin-cw 3.5s linear infinite",
          }}
        >
          <circle
            cx={cx} cy={cy} r={r3}
            stroke="rgba(124,92,255,0.8)"
            strokeWidth="1"
            strokeDasharray={`${r3 * Math.PI * 0.7} ${r3 * Math.PI * 0.3}`}
            strokeLinecap="round"
          />
        </g>

        {/* ── Four radial tick marks ── */}
        {[45, 135, 225, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const innerR = r2 + 2;
          const outerR = r1 - 2;
          return (
            <line
              key={deg}
              x1={cx + innerR * Math.cos(rad)}
              y1={cy + innerR * Math.sin(rad)}
              x2={cx + outerR * Math.cos(rad)}
              y2={cy + outerR * Math.sin(rad)}
              stroke="rgba(124,92,255,0.3)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* ── Centre core — pulses ── */}
        <circle
          cx={cx} cy={cy} r={rc + 1}
          fill="rgba(124,92,255,0.15)"
          style={{
            animation: state === "thinking"
              ? "sp-core-fast 0.8s ease-in-out infinite"
              : "sp-core 2.5s ease-in-out infinite",
          }}
        />
        <circle
          cx={cx} cy={cy} r={rc}
          fill="rgba(167,139,255,1)"
          style={{
            filter: "drop-shadow(0 0 4px rgba(124,92,255,0.9))",
          }}
        />
        {/* highlight */}
        <circle
          cx={cx - rc * 0.3}
          cy={cy - rc * 0.3}
          r={rc * 0.4}
          fill="rgba(255,255,255,0.6)"
        />
      </svg>

      <style>{`
        @keyframes sp-spin-cw  { to { transform: rotate(360deg); } }
        @keyframes sp-spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes sp-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes sp-pulse-fast {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.18); }
        }
        @keyframes sp-core {
          0%, 100% { r: ${rc + 1}px; opacity: 0.15; }
          50%       { r: ${rc + 3}px; opacity: 0.35; }
        }
        @keyframes sp-core-fast {
          0%, 100% { r: ${rc + 1}px; opacity: 0.2; }
          50%       { r: ${rc + 4}px; opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

// ─── Main SilverBot Widget ────────────────────────────────────────────────────

export function SilverBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm SilverBot 🤖 — your guide to Silver Prime and the AIPC drone. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMsg, setBubbleMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Floating position state ─────────────────────────────────────────────────
  const [edgePositions, setEdgePositions] = useState<EdgePos[]>([]);
  const [posIdx, setPosIdx] = useState(3); // start near bottom-right (index 3 = 82% down right edge)
  const [viewportHeight, setViewportHeight] = useState(900);
  const [ready, setReady] = useState(false);
  const [driftEnabled, setDriftEnabled] = useState(false);

  // Current rest position — default to off-screen until client-side init
  const currentPos: EdgePos =
    edgePositions.length > 0
      ? edgePositions[posIdx % edgePositions.length]
      : { x: 9999, y: 9999, edge: "bottom" };

  // Opening direction: if the orb is high on screen, chat opens DOWNWARD to avoid clipping
  // Threshold: need at least chatHeight (min 480) + 12px gap below current y
  const chatMaxHeight = Math.min(480, viewportHeight - 120);
  const openDownward = currentPos.y < chatMaxHeight + 16;

  // ── Init positions & resize handler ────────────────────────────────────────
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setViewportHeight(vh);
      setEdgePositions(getEdgePositions(vw, vh));
    };
    compute();
    setReady(true);
    // Enable drift after orb has settled into its initial position
    const t = setTimeout(() => setDriftEnabled(true), 600);
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  // ── Drift interval — advances position every 28 s when chat is closed ───────
  useEffect(() => {
    if (!driftEnabled || isOpen || edgePositions.length <= 1) return;
    const id = setInterval(() => {
      setPosIdx((p) => (p + 1) % edgePositions.length);
    }, DRIFT_MS);
    return () => clearInterval(id);
  }, [driftEnabled, isOpen, edgePositions.length]);

  // ── Proactive thought bubble ────────────────────────────────────────────────
  useEffect(() => {
    const dismissed = sessionStorage.getItem("silverbot-bubble-dismissed");
    if (dismissed) return;

    const idx = Math.floor(Date.now() / 86400000) % PROACTIVE_MESSAGES.length;
    setBubbleMsg(PROACTIVE_MESSAGES[idx]);

    const showTimer = setTimeout(() => setShowBubble(true), 7000);
    const hideTimer = setTimeout(() => {
      setShowBubble(false);
      sessionStorage.setItem("silverbot-bubble-dismissed", "1");
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // ── Scroll to latest message ────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // ── Focus input on open ─────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  // ── Open chat (dismiss bubble) ──────────────────────────────────────────────
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShowBubble(false);
    sessionStorage.setItem("silverbot-bubble-dismissed", "1");
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);
    setOrbState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("API error");
      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into a problem. Please try again, or browse the site for answers! 🛸",
        },
      ]);
    } finally {
      setIsLoading(false);
      setOrbState("idle");
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  //
  // Structure:
  //   motion.div  ← floating anchor (52×52, position: fixed, translated to currentPos)
  //     │
  //     ├─ motion.div  ← chat window   (position: absolute, opens above or below orb)
  //     ├─ motion.button ← thought bubble (position: absolute, always above orb)
  //     └─ motion.button ← orb launcher  (position: absolute at 0,0 within anchor)
  //
  // The motion.div uses Framer Motion's x/y transforms (GPU-accelerated) from a
  // base of left:0 / top:0, so children's absolute offsets track the visual position.
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: ORB_SIZE,
        height: ORB_SIZE,
        zIndex: 50,
        pointerEvents: "none",
        overflow: "visible",
        opacity: ready ? 1 : 0,
      }}
      animate={{ x: currentPos.x, y: currentPos.y }}
      transition={
        driftEnabled
          ? { duration: 3, ease: [0.45, 0, 0.55, 1] }
          : { duration: 0 }
      }
    >
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: openDownward ? -16 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: openDownward ? -16 : 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              position: "absolute",
              // Opens upward unless the orb is in the upper portion of the viewport
              ...(openDownward
                ? { top: ORB_SIZE + 12 }   // 12 px gap below orb
                : { bottom: ORB_SIZE + 12 } // 12 px gap above orb
              ),
              // Always anchor to the right edge of the orb container;
              // the 340 px width extends leftward toward viewport center.
              right: 0,
              width: "min(340px, calc(100vw - 48px))",
              height: `min(${chatMaxHeight}px, calc(100vh - 120px))`,
              background: "rgba(14,14,18,0.96)",
              border: "1px solid rgba(124,92,255,0.28)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,92,255,0.1)",
              backdropFilter: "blur(20px)",
              pointerEvents: "all",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(14,14,18,0.8) 100%)",
                borderBottom: "1px solid rgba(124,92,255,0.15)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <SilverBotOrb state={orbState} size={28} />
                <div>
                  <p className="text-sm font-semibold text-silver-100 leading-none">
                    SilverBot
                  </p>
                  <p className="text-[10px] text-silver-500 mt-0.5">
                    {isLoading ? "Thinking…" : "Silver Prime assistant"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-silver-500 hover:text-silver-100 transition p-1 rounded-lg hover:bg-white/5"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M12.5 4.5l-8 8M4.5 4.5l8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="mr-2 mt-1 shrink-0">
                      <SilverBotOrb state="idle" size={22} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm leading-relaxed max-w-[82%] ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "text-silver-200 rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(124,92,255,0.85), rgba(100,72,230,0.85))",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 shrink-0">
                    <SilverBotOrb state="thinking" size={22} />
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="block w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"
                          style={{
                            animation: `sp-bounce 1.2s ease-in-out ${d * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </span>
                    <style>{`
                      @keyframes sp-bounce {
                        0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                        40%           { transform: translateY(-5px); opacity: 1; }
                      }
                    `}</style>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 pb-3 pt-2 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,92,255,0.2)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Silver Prime…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-silver-100 placeholder-silver-600 outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 rounded-lg p-1.5 transition disabled:opacity-30"
                  style={{
                    background:
                      input.trim() && !isLoading
                        ? "rgba(124,92,255,0.8)"
                        : "transparent",
                  }}
                  aria-label="Send"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M12 7L2 2l2.5 5L2 12l10-5z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-center text-[10px] text-silver-700 mt-1.5">
                AI responses may not be 100% accurate — always verify specs on
                the product pages.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Thought Bubble — always appears above the orb ── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            onClick={handleOpen}
            className="relative rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium text-silver-100 text-left"
            style={{
              position: "absolute",
              bottom: ORB_SIZE + 12, // always above the orb
              right: 0,
              background: "rgba(14,14,18,0.95)",
              border: "1px solid rgba(124,92,255,0.35)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,255,0.08)",
              backdropFilter: "blur(16px)",
              maxWidth: "220px",
              whiteSpace: "nowrap",
              pointerEvents: "all",
            }}
            aria-label="Open SilverBot chat"
          >
            {bubbleMsg}
            {/* Tail triangle pointing down toward the orb */}
            <span
              className="absolute -bottom-2 right-5"
              style={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "8px solid rgba(124,92,255,0.35)",
              }}
            />
            <span
              className="absolute -bottom-1.5 right-5"
              style={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "8px solid rgba(14,14,18,0.95)",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Orb Launcher ── */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 400, damping: 20 },
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "all",
          filter: "drop-shadow(0 0 12px rgba(124,92,255,0.5))",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label={
          isOpen
            ? "Close SilverBot"
            : "Open SilverBot — ask about Silver Prime"
        }
      >
        <SilverBotOrb state={orbState} size={52} />

        {/* Unread dot — shown before first open */}
        {!isOpen && showBubble && (
          <span
            className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#7C5CFF] border-2 border-[#0A0A0C]"
            style={{ animation: "sp-pulse 2s ease-in-out infinite" }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
