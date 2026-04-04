"use client";

import Link from "next/link";
import Image from "next/image";
import { Monogram } from "@/components/monogram";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Conversation Data ─── */
/* Each turn is one bubble. Consecutive lines within a turn render as lines inside that bubble. */

type Turn =
  | { role: "me"; lines: string[]; image?: string; imageAlt?: string }
  | { role: "os"; lines: string[] }
  | { role: "pause"; duration: number };

const scene1: Turn[] = [
  {
    role: "me",
    image: "/book-moment.jpg",
    imageAlt: "A book page with scattered handwritten labels and reviews",
    lines: [
      "create a moment for tonight",
      "",
      "this is striking…",
      "the artist replaces the book name with how it feels",
      "I can't name why it's striking yet",
      "",
      "how do I apply this in life?",
    ],
  },
  { role: "pause", duration: 1000 },
  {
    role: "os",
    lines: [
      "Don't rush that part",
      "",
      "Where does the label",
      "get in the way of the feeling?",
    ],
  },
  { role: "pause", duration: 800 },
  {
    role: "me",
    lines: ["identity", "job titles", "exes"],
  },
  { role: "pause", duration: 800 },
  {
    role: "os",
    lines: ["what gets lost?"],
  },
  { role: "pause", duration: 600 },
  {
    role: "me",
    lines: ["label diminishes the person", "it's narrow"],
  },
  { role: "pause", duration: 1200 },
  {
    role: "os",
    lines: [
      "remove the label,",
      "offer the felt experience,",
      "things become fuller",
      "",
      "That's the insight",
      "",
      "Want me to save this?",
    ],
  },
];

const scene2Nudge = {
  title: "Week 1 — Carriage",
  body: [
    "the way you move",
    "is the first thing people feel",
    "before you speak",
  ],
  instruction: [
    "pause at the door",
    "shoulders down",
    "gaze forward",
    "",
    "move like you have somewhere beautiful to be",
  ],
  prompt: "what energy are you carrying today?",
  options: ["warm", "poised", "magnetic", "serene", "sharp"],
};

/* ─── Typing Indicator (wave dots) ─── */

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#963D5A",
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

/* ─── Chat Bubble ─── */

function ChatBubble({
  turn,
  onComplete,
  isActive,
}: {
  turn: Extract<Turn, { role: "me" } | { role: "os" }>;
  onComplete: () => void;
  isActive: boolean;
}) {
  const isMe = turn.role === "me";
  const hasImage = isMe && "image" in turn && !!turn.image;
  const allText = turn.lines.join("\n");
  const totalChars = allText.length;
  const [displayed, setDisplayed] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (displayed < totalChars) {
      // Skip faster through empty lines
      const nextChar = allText[displayed];
      const speed = nextChar === "\n" ? 8 : 30;
      const t = setTimeout(() => setDisplayed((d) => d + 1), speed);
      return () => clearTimeout(t);
    } else if (!doneRef.current) {
      doneRef.current = true;
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }
  }, [displayed, totalChars, isActive, onComplete, allText]);

  // Build partial lines
  const partialText = allText.slice(0, displayed);
  const renderedLines = partialText.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        paddingLeft: isMe ? "2.5rem" : 0,
        paddingRight: isMe ? 0 : "2.5rem",
        marginBottom: "0.6rem",
      }}
    >
      <div
        style={{
          background: isMe ? "#B07DD4" : "#E3DAFF",
          color: isMe ? "#FAF6F2" : "#2A1520",
          padding: "0.65rem 0.95rem",
          borderRadius: "1.1rem",
          borderTopRightRadius: isMe ? "0.3rem" : "1.1rem",
          borderTopLeftRadius: isMe ? "1.1rem" : "0.3rem",
          maxWidth: "82%",
          fontSize: "0.78rem",
          lineHeight: 1.6,
          fontWeight: 300,
        }}
        className="font-sans"
      >
        {/* Image first if present */}
        {hasImage && (
          <div style={{ marginBottom: "0.5rem" }}>
            <Image
              src={turn.image!}
              alt={(turn as { imageAlt?: string }).imageAlt || ""}
              width={220}
              height={280}
              style={{
                borderRadius: "0.65rem",
                objectFit: "cover",
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: 220,
              }}
            />
          </div>
        )}
        {/* Text lines */}
        {renderedLines.map((line, i) =>
          line === "" ? (
            <div key={i} style={{ height: "0.55rem" }} />
          ) : (
            <div key={i}>{line}</div>
          )
        )}
      </div>
    </motion.div>
  );
}

/* ─── iPhone 17 Chat (Scene 1) ─── */

function IPhoneChat() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [allTypingDone, setAllTypingDone] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView, started]);

  const handleComplete = useCallback(() => {
    const nextIdx = visibleCount; // next index to show (0-based, visibleCount is count)
    if (nextIdx >= scene1.length) return;

    const next = scene1[nextIdx];
    if (next.role === "pause") {
      // During pause, check if the message AFTER the pause is from "os" → show typing
      const afterPause = nextIdx + 1 < scene1.length ? scene1[nextIdx + 1] : null;
      if (afterPause && afterPause.role === "os") {
        setShowTyping(true);
      }
      setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((c) => c + 2); // skip pause, show next
      }, (next as { duration: number }).duration);
      setVisibleCount((c) => c + 1); // count the pause
    } else {
      // Check if this next message is "os" and show brief typing
      if (next.role === "os") {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount((c) => c + 1);
        }, 600);
      } else {
        setVisibleCount((c) => c + 1);
      }
    }
  }, [visibleCount]);

  // Start first message
  useEffect(() => {
    if (started && visibleCount === 0) {
      setVisibleCount(1);
    }
  }, [started, visibleCount]);

  // Auto-scroll — continuously scroll the chat container until all typing finishes
  useEffect(() => {
    if (!started || allTypingDone) return;
    const interval = setInterval(() => {
      const el = chatContainerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 80);
    return () => clearInterval(interval);
  }, [started, allTypingDone]);

  // Filter out pauses for rendering
  const visibleTurns = scene1.slice(0, visibleCount).filter(
    (t): t is Extract<Turn, { role: "me" } | { role: "os" }> =>
      t.role !== "pause"
  );

  const isLastTurnVisible = visibleCount >= scene1.length;
  const lastVisibleNonPause = visibleTurns.length - 1;

  // Determine if the last bubble has finished typing
  const handleLastBubbleComplete = useCallback(() => {
    setAllTypingDone(true);
  }, []);

  return (
    <div ref={ref}>
      {/* Scene label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-sans text-center"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(76,25,27,0.4)",
          marginBottom: "1.5rem",
        }}
      >
        reflection on a moment
      </motion.div>

      {/* iPhone 17 frame — taller, thinner bezels, dynamic island */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          width: "min(360px, 88vw)",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "3rem",
          border: "3px solid #1a1a1a",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            width: 96,
            height: 28,
            background: "#1a1a1a",
            borderRadius: 20,
            margin: "10px auto 0",
          }}
        />

        {/* Header — PERSONAL OS + typing indicator */}
        <div
          style={{
            padding: "0.65rem 1.2rem 0.4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="font-sans"
            style={{
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#963D5A",
            }}
          >
            personal os
          </span>
          <div style={{ height: 16, display: "flex", alignItems: "center" }}>
            <AnimatePresence>
              {showTyping && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans"
                  style={{
                    fontSize: "0.55rem",
                    fontWeight: 300,
                    color: "#963D5A",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  assistant typing
                  <TypingDots />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat area — fixed height, internal scroll only */}
        <div
          ref={chatContainerRef}
          style={{
            padding: "0.6rem 0.85rem 2rem",
            height: 640,
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div>
            <AnimatePresence>
              {visibleTurns.map((turn, i) => (
                <ChatBubble
                  key={i}
                  turn={turn}
                  isActive={i === lastVisibleNonPause && !allTypingDone}
                  onComplete={
                    i === lastVisibleNonPause
                      ? isLastTurnVisible
                        ? handleLastBubbleComplete
                        : handleComplete
                      : () => {}
                  }
                />
              ))}
            </AnimatePresence>

            {/* Typing indicator in chat area */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingRight: "2.5rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      background: "#E3DAFF",
                      padding: "0.6rem 0.95rem",
                      borderRadius: "1.1rem",
                      borderTopLeftRadius: "0.3rem",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: "32%",
            height: 4,
            background: "rgba(0,0,0,0.12)",
            borderRadius: 4,
            margin: "0 auto 0.5rem",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── iPhone Nudge Chat (Scene 2) ─── */

function IPhoneNudge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [phase, setPhase] = useState<"idle" | "typing" | "card">("idle");

  useEffect(() => {
    if (!isInView) return;
    // Show typing dots after phone appears
    const t1 = setTimeout(() => setPhase("typing"), 800);
    // Then show the card
    const t2 = setTimeout(() => setPhase("card"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  return (
    <div ref={ref}>
      {/* Scene label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-sans text-center"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(76,25,27,0.4)",
          marginBottom: "1.5rem",
        }}
      >
        behavioral nudge
      </motion.div>

      {/* iPhone 17 frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          width: "min(360px, 88vw)",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "3rem",
          border: "3px solid #1a1a1a",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            width: 96,
            height: 28,
            background: "#1a1a1a",
            borderRadius: 20,
            margin: "10px auto 0",
          }}
        />

        {/* Header — PERSONAL OS + typing indicator */}
        <div
          style={{
            padding: "0.65rem 1.2rem 0.4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="font-sans"
            style={{
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#963D5A",
            }}
          >
            personal os
          </span>
          <div style={{ height: 16, display: "flex", alignItems: "center" }}>
            <AnimatePresence>
              {phase === "typing" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans"
                  style={{
                    fontSize: "0.55rem",
                    fontWeight: 300,
                    color: "#963D5A",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  assistant typing
                  <TypingDots />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            padding: "0.6rem 0.85rem 2rem",
            height: 640,
          }}
        >
          {/* Typing dots bubble */}
          <AnimatePresence>
            {phase === "typing" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingRight: "2.5rem",
                  marginBottom: "0.6rem",
                }}
              >
                <div
                  style={{
                    background: "#E3DAFF",
                    padding: "0.6rem 0.95rem",
                    borderRadius: "1.1rem",
                    borderTopLeftRadius: "0.3rem",
                  }}
                >
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nudge card as a chat bubble */}
          <AnimatePresence>
            {phase === "card" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingRight: "1.5rem",
                }}
              >
                <div
                  style={{
                    background: "#E3DAFF",
                    borderRadius: "1.1rem",
                    borderTopLeftRadius: "0.3rem",
                    padding: "1.2rem 1.2rem",
                    maxWidth: "90%",
                    boxShadow: "0 2px 12px rgba(42,21,32,0.06)",
                  }}
                >
                  {/* Greeting */}
                  <div
                    className="font-sans"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 300,
                      color: "#5C4555",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Here&rsquo;s your morning greeting.
                  </div>

                  {/* Title */}
                  <NudgeRevealLine
                    text={scene2Nudge.title}
                    delay={0.2}
                    className="font-serif"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "#2A1520",
                      marginBottom: "0.75rem",
                    }}
                  />

                  {/* Body */}
                  {scene2Nudge.body.map((line, i) => (
                    <NudgeRevealLine
                      key={`b-${i}`}
                      text={line}
                      delay={0.4 + i * 0.12}
                      className="font-serif"
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: "#4C191B",
                        fontStyle: "italic",
                      }}
                    />
                  ))}

                  {/* Divider */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.2, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    style={{
                      height: 1,
                      background: "#963D5A",
                      margin: "0.8rem 0",
                      transformOrigin: "left",
                    }}
                  />

                  {/* Instructions */}
                  {scene2Nudge.instruction.map((line, i) =>
                    line === "" ? (
                      <div key={`s-${i}`} style={{ height: "0.5rem" }} />
                    ) : (
                      <NudgeRevealLine
                        key={`i-${i}`}
                        text={line}
                        delay={1.1 + i * 0.1}
                        className="font-sans"
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 300,
                          lineHeight: 1.65,
                          color: "#2A1520",
                        }}
                      />
                    )
                  )}

                  {/* Divider */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.2, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    style={{
                      height: 1,
                      background: "#963D5A",
                      margin: "0.8rem 0",
                      transformOrigin: "left",
                    }}
                  />

                  {/* Prompt */}
                  <NudgeRevealLine
                    text={scene2Nudge.prompt}
                    delay={1.9}
                    className="font-sans"
                    style={{
                      fontSize: "0.73rem",
                      fontWeight: 300,
                      color: "#5C4555",
                      marginBottom: "0.65rem",
                    }}
                  />

                  {/* Option pills */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.1 }}
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
                  >
                    {scene2Nudge.options.map((opt) => (
                      <span
                        key={opt}
                        className="font-sans"
                        style={{
                          fontSize: "0.63rem",
                          fontWeight: 400,
                          letterSpacing: "0.08em",
                          padding: "0.3rem 0.65rem",
                          borderRadius: "2rem",
                          background: "rgba(176,125,212,0.18)",
                          color: "#4C191B",
                        }}
                      >
                        {opt}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: "32%",
            height: 4,
            background: "rgba(0,0,0,0.12)",
            borderRadius: 4,
            margin: "0 auto 0.5rem",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Nudge line reveal helper ─── */

function NudgeRevealLine({
  text,
  delay,
  className,
  style,
}: {
  text: string;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className={className}
      style={style}
    >
      {text}
    </motion.div>
  );
}


/* ─── Page ─── */

export default function ShapePage() {
  const headerBg = "rgba(227,218,255,0.85)";
  const headerTextColor = "rgba(76,25,27,0.45)";
  const headerActiveColor = "rgba(76,25,27,0.9)";
  const monogramColor = "#4C191B";

  return (
    <div>
      {/* Header — same as Distill */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12"
        style={{
          height: "80px",
          background: headerBg,
          backdropFilter: "blur(12px)",
          transition: "background 0.5s ease",
        }}
      >
        <Monogram color={monogramColor} />
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8">
          {[
            { href: "/about", label: "About" },
            { href: "/distill", label: "Distill" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans no-underline"
              style={{
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: headerTextColor,
                transition: "color 0.3s ease",
                padding: "0.5rem 0",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = headerActiveColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = headerTextColor)
              }
            >
              {link.label}
            </Link>
          ))}
          <span
            className="font-sans"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: headerActiveColor,
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Shape
          </span>
          <Link
            href="/tenets"
            className="font-sans no-underline"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: headerTextColor,
              transition: "color 0.3s ease",
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = headerActiveColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = headerTextColor)
            }
          >
            Tenets
          </Link>
        </nav>
      </header>

      {/* Title section — lavender background */}
      <div style={{ paddingTop: "120px", paddingBottom: "2rem", background: "#E3DAFF" }}>
        <div className="px-6 sm:px-12 md:px-20">
          <h1
            className="font-display uppercase"
            style={{
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              letterSpacing: "0.08em",
              color: "#4C191B",
              marginBottom: "1rem",
            }}
          >
            Shape
          </h1>
          <p
            className="font-sans"
            style={{
              fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              lineHeight: 1.8,
              color: "#5C4555",
              maxWidth: "50ch",
            }}
          >
            Systems that guide reflection and behavior over time.
            Designed for becoming, not just doing.
          </p>
        </div>
      </div>

      {/* Project section — lavender background */}
      <div
        style={{
          background: "#E3DAFF",
          padding: "clamp(2rem, 4vw, 3rem) 1.5rem clamp(6rem, 10vw, 10rem)",
        }}
      >
        {/* Project title */}
        <div className="text-center" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans"
            style={{
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(76,25,27,0.35)",
              marginBottom: "0.75rem",
            }}
          >
            01
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              letterSpacing: "0.06em",
              color: "#4C191B",
              marginBottom: "1.2rem",
            }}
          >
            My Personal OS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-serif"
            style={{
              fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "#5C4555",
              maxWidth: "32ch",
              margin: "0 auto",
            }}
          >
            A system that shapes how I live,
            <br />
            not just what I do.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-sans"
            style={{
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#4C191B",
              maxWidth: "42ch",
              margin: "1rem auto 0",
            }}
          >
            It captures moments from the day and helps turn them into something usable.
          </motion.p>
        </div>

        {/* Scene 1 — Reflection */}
        <IPhoneChat />

        {/* Scene 1 caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-sans text-center"
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#5C4555",
            maxWidth: "42ch",
            margin: "clamp(2rem, 4vw, 3rem) auto 0",
          }}
        >
          I start with a rough signal. The system helps me distill it.
        </motion.p>

        {/* Spacer */}
        <div style={{ height: "clamp(5rem, 10vw, 8rem)" }} />

        {/* Scene 2 — Nudge */}
        <IPhoneNudge />

        {/* Scene 2 caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-sans text-center"
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#5C4555",
            maxWidth: "42ch",
            margin: "clamp(2rem, 4vw, 3rem) auto 0",
          }}
        >
          A daily nudge that turns willpower into an enduring system.
        </motion.p>

      </div>

      <div className="grain" />
    </div>
  );
}
