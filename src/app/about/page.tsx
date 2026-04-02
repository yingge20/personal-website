"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/monogram";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Floating photo gallery — matching concept 2F positions ── */
const photos = [
  { top: "6vh",  right: "28vw", w: "16vw", h: "22vh", bg: "#E3DAFF", border: true, hideOnMobile: false },
  { top: "4vh",  right: "6vw",  w: "14vw", h: "18vh", bg: "#E3DAFF", border: true, hideOnMobile: true },
  { top: "16vh", left: "22vw",  w: "18vw", h: "28vh", bg: "#963D5A", border: false, hideOnMobile: false },
  { top: "38vh", left: "18vw",  w: "14vw", h: "20vh", bg: "#E3DAFF", border: true, hideOnMobile: true },
  { top: "30vh", right: "5vw",  w: "13vw", h: "18vh", bg: "#E3DAFF", border: true, hideOnMobile: true },
  { top: "50vh", right: "15vw", w: "16vw", h: "24vh", bg: "#E3DAFF", border: true, hideOnMobile: false },
  { top: "72vh", right: "5vw",  w: "12vw", h: "18vh", bg: "#B07DD4", border: false, hideOnMobile: true },
];

function PhotoPlaceholder({
  photo,
  index,
  scrollYProgress,
}: {
  photo: (typeof photos)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rate = 8 + (index % 4) * 6;
  const rawY = useTransform(scrollYProgress, [0, 1], [-rate, rate]);
  const y = useSpring(rawY, { stiffness: 40, damping: 30 });

  const posStyle: React.CSSProperties = {
    top: photo.top,
    width: photo.w,
    height: photo.h,
    backgroundColor: photo.bg,
    ...(photo.right ? { right: photo.right } : {}),
    ...(photo.left ? { left: photo.left } : {}),
    ...(photo.border ? { border: "1px solid rgba(176,125,212,0.2)" } : {}),
  };

  const isDark = photo.bg === "#963D5A" || photo.bg === "#B07DD4";

  // Slow circular float — each photo has different duration and radius
  const floatDuration = 14 + (index % 4) * 5; // 14-29s per orbit
  const floatRadius = 14 + (index % 3) * 8; // 14-30px radius

  return (
    <motion.div
      className={`absolute flex items-center justify-center font-sans select-none pointer-events-none ${photo.hideOnMobile ? "hidden sm:flex" : ""}`}
      style={{ ...posStyle, zIndex: 3, y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: [0, floatRadius, 0, -floatRadius, 0],
        translateY: [0, -floatRadius, 0, floatRadius, 0],
      }}
      transition={{
        opacity: { delay: 0.2 + index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        y: { delay: 0.2 + index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        x: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
        translateY: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDuration / 4 },
      }}
    >
      <span
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(176,125,212,0.4)",
        }}
      >
        photo
      </span>
    </motion.div>
  );
}

type NameVariant = "d1" | "d4" | "d5";

function NameTypography({ variant }: { variant: NameVariant }) {
  const fontSize = "clamp(5rem, 20vw, 22rem)";
  const outline = { color: "transparent" as const, WebkitTextStroke: "2px #4C191B" };
  const filled = { color: "#4C191B" };
  const transition = { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as number[] };
  const common = { fontWeight: 900, fontSize, lineHeight: 0.8, letterSpacing: "-0.05em", zIndex: 2 };

  if (variant === "d1") {
    // Diagonal left — Ying upper-left, Ge below + indented right, both on left half
    return (
      <>
        <motion.span
          className="absolute font-display left-4 sm:left-[4vw]"
          style={{ ...common, ...outline, bottom: "18vh" }}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 0.95, x: 0 }} transition={transition}
        >
          Ying
        </motion.span>
        <motion.span
          className="absolute font-display left-[38vw] sm:left-[42vw]"
          style={{ ...common, ...filled, bottom: "1vh" }}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 0.95, x: 0 }} transition={{ ...transition, delay: 0.5 }}
        >
          Ge
        </motion.span>
      </>
    );
  }

  if (variant === "d4") {
    // D4: Vertical cascade — large Ying top-left, Ge tucked underneath offset right
    return (
      <>
        <motion.span
          className="absolute font-display left-4 sm:left-[4vw]"
          style={{ ...common, ...outline, bottom: "18vh" }}
          initial={{ opacity: 0, y: -40 }} animate={{ opacity: 0.95, y: 0 }} transition={transition}
        >
          Ying
        </motion.span>
        <motion.span
          className="absolute font-display left-[38vw] sm:left-[40vw]"
          style={{ ...common, ...filled, bottom: "1vh" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 0.95, y: 0 }} transition={{ ...transition, delay: 0.5 }}
        >
          Ge
        </motion.span>
      </>
    );
  }

  // D5: Inline — both names on one line near the bottom
  return (
    <motion.div
      className="absolute font-display left-4 sm:left-[4vw] right-4 sm:right-[4vw] flex items-baseline gap-[0.15em]"
      style={{ bottom: "5vh", zIndex: 2 }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.95, y: 0 }} transition={transition}
    >
      <span style={{ ...common, ...outline }}>Ying</span>
      <span style={{ ...common, ...filled }}>Ge</span>
    </motion.div>
  );
}

function HeroPanel({
  scrollYProgress,
  nameVariant,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  nameVariant: NameVariant;
}) {
  return (
    <div
      className="sticky top-0 h-screen overflow-hidden"
      style={{ backgroundColor: "#FAF6F2", zIndex: 1 }}
    >
      {/* Y — G Monogram — top left */}
      <div className="absolute z-10" style={{ top: "1.5rem", left: "1.5rem" }}>
        <Monogram color="#4C191B" />
      </div>

      {/* Floating photos */}
      {photos.map((photo, i) => (
        <PhotoPlaceholder
          key={i}
          photo={photo}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Massive name — bottom left */}
      <NameTypography variant={nameVariant} />

      {/* Bio — centered in the whitespace */}
      <motion.div
        className="absolute z-10"
        style={{
          top: "38%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          maxWidth: "clamp(280px, 30vw, 480px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-sans block mb-5"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(76,25,27,0.55)",
            fontWeight: 400,
          }}
        >
          Product &middot; Builder
        </span>
        <p
          className="font-sans"
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
            color: "#2A1520",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          I design systems that shape behavior, not just generate answers. At the intersection of{" "}
          <strong style={{ color: "#2A1520", fontWeight: 500 }}>
            AI, decision-making, and human experience
          </strong>
          .
        </p>
      </motion.div>
    </div>
  );
}

function TypographyPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entrance: text flies in slowly as panel scrolls into view
  // P1 flies from far left, P2 flies from below
  // Then both hold steady until scroll reaches ~65%, then fly out
  const p1X = useTransform(scrollYProgress, [0.0, 0.35, 0.65, 0.85], [-1200, 0, 0, -600]);
  const p1Opacity = useTransform(scrollYProgress, [0.0, 0.3, 0.65, 0.82], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.05, 0.4], [800, 0]);
  const p2X = useTransform(scrollYProgress, [0.65, 0.85], [0, 600]);
  const p2Opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.82], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen overflow-hidden"
      style={{ backgroundColor: "#B07DD4", zIndex: 2 }}
    >
      {/* First paragraph — flies in from left via scroll, exits left */}
      <motion.p
        className="absolute font-display uppercase left-6 sm:left-[6vw] right-6 sm:right-auto sm:max-w-[45vw]"
        style={{
          top: "15vh",
          fontWeight: 800,
          fontSize: "clamp(1.3rem, 3vw, 3.8rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#2A1520",
          x: p1X,
          opacity: p1Opacity,
        }}
      >
        I&apos;m interested in how systems think, how they fail, and how to make them more consistent, reliable, and aligned with real-world complexity.
      </motion.p>

      {/* Second paragraph — flies in from bottom via scroll, exits right */}
      <motion.p
        className="absolute font-display uppercase right-6 sm:right-[6vw] left-6 sm:left-auto sm:text-right sm:max-w-[40vw]"
        style={{
          bottom: "18vh",
          fontWeight: 400,
          fontSize: "clamp(0.95rem, 1.8vw, 2.2rem)",
          lineHeight: 1.35,
          letterSpacing: "0.03em",
          color: "#4C191B",
          x: p2X,
          y: p2Y,
          opacity: p2Opacity,
        }}
      >
        My background spans finance, accounting, technology, and{" "}
        <span style={{ color: "#FAF6F2", fontWeight: 900 }}>AI</span>, shaping
        how I build:{" "}
        <span style={{ borderBottom: "0.15em solid #FAF6F2", paddingBottom: "0.05em" }}>
          structured
        </span>
        ,{" "}
        <span style={{ borderBottom: "0.15em solid #FAF6F2", paddingBottom: "0.05em" }}>
          detail-aware
        </span>
        , and{" "}
        <span style={{ borderBottom: "0.15em solid #FAF6F2", paddingBottom: "0.05em" }}>
          grounded
        </span>{" "}
        in how things actually&nbsp;work.
      </motion.p>
    </div>
  );
}

const workSections = [
  { key: "distill", num: "01", title: "Distill", desc: "Insights and patterns uncovered through building", href: "/distill", accent: "#B07DD4" },
  { key: "shape", num: "02", title: "Shape", desc: "Systems I design to guide behavior and decisions", href: "/shape", accent: "#4C191B" },
  { key: "tenets", num: "03", title: "Tenets", desc: "Principles that shape how I think and operate", href: "/tenets", accent: "#B07DD4" },
];

/* ── Shatter transition panels ── */
const GRID_COLS = 12;
const GRID_ROWS = 8;

// Pre-generate random values so they're stable across renders
const shatterRandom = Array.from({ length: GRID_ROWS * GRID_COLS }, () => ({
  extraDist: Math.random() * 300,
  rotation: (Math.random() - 0.5) * 180,
}));

function ShatterOverlay({ panelColors, onComplete }: { panelColors: string[]; onComplete: () => void }) {
  const pieces = [];

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const idx = row * GRID_COLS + col;
      // Which panel column this piece belongs to (3 panels)
      const panelIdx = Math.min(Math.floor((col / GRID_COLS) * 3), 2);
      // Direction from center of the full grid
      const cx = (col - (GRID_COLS - 1) / 2) / ((GRID_COLS - 1) / 2);
      const cy = (row - (GRID_ROWS - 1) / 2) / ((GRID_ROWS - 1) / 2);
      const dist = Math.sqrt(cx * cx + cy * cy);
      const r = shatterRandom[idx];
      const flyX = cx * (500 + r.extraDist);
      const flyY = cy * (500 + r.extraDist);
      // Center pieces leave first
      const delay = dist * 0.18;

      pieces.push(
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${(col / GRID_COLS) * 100}%`,
            top: `${(row / GRID_ROWS) * 100}%`,
            width: `${(1 / GRID_COLS) * 100 + 0.3}%`,
            height: `${(1 / GRID_ROWS) * 100 + 0.3}%`,
            backgroundColor: panelColors[panelIdx],
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
          animate={{ x: flyX, y: flyY, rotate: r.rotation, opacity: 0, scale: 0.5 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.2, 0, 0, 1],
          }}
        />
      );
    }
  }

  useEffect(() => {
    const maxTime = Math.sqrt(2) * 0.18 + 1.2;
    // Hold on the revealed bg briefly before navigating
    const t = setTimeout(onComplete, maxTime * 1000 + 600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-[10] pointer-events-none">
      {pieces}
    </div>
  );
}

const PANEL_COLORS = ["#FAF6F2", "#E3DAFF", "#4C191B"];
const DEST_BG_COLORS = ["#F5F0F6", "#FAF6F2", "#4C191B"];

function RotatingPanels({ onTransition }: { onTransition: (destBg: string, href: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const textColors = ["#4C191B", "#2A1520", "#FAF6F2"];
  const subtextColors = ["rgba(76,25,27,0.6)", "rgba(42,21,32,0.6)", "rgba(250,246,242,0.65)"];
  const hintColors = ["rgba(76,25,27,0.3)", "rgba(42,21,32,0.3)", "rgba(250,246,242,0.3)"];

  const handleClick = (key: string, href: string, index: number) => {
    if (selected) return;
    setSelected(key);
    // Brief pause for content to fade, then trigger page-level transition
    setTimeout(() => onTransition(DEST_BG_COLORS[index], href), 300);
  };

  return (
    <div className="flex w-full h-full relative">
      {workSections.map((s, i) => {
        const anySelected = selected !== null;
        return (
          <div
            key={s.key}
            className="relative flex-1 cursor-pointer overflow-hidden"
            style={{
              borderRight: i < 2 ? "1px solid rgba(250,246,242,0.06)" : "none",
              zIndex: 6,
            }}
            onClick={() => handleClick(s.key, s.href, i)}
          >
            {/* Panel background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: PANEL_COLORS[i] }}
            />

            {/* Card content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 z-[3]"
              animate={{ opacity: anySelected ? 0 : 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-sans mb-4" style={{ fontSize: "0.8rem", letterSpacing: "0.3em", color: s.accent }}>{s.num}</span>
              <h3 className="font-display uppercase text-center" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 300, color: textColors[i], lineHeight: 1.05, letterSpacing: "0.08em" }}>{s.title}</h3>
              <div className="mt-5" style={{ width: 30, height: 1, backgroundColor: s.accent, opacity: 0.6 }} />
              <p className="font-sans text-center mt-5" style={{ fontSize: "clamp(1rem, 1.3vw, 1.1rem)", lineHeight: 1.7, color: subtextColors[i], fontWeight: 400, maxWidth: "24ch" }}>{s.desc}</p>
              <span className="font-sans mt-10" style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: hintColors[i] }}>Click to enter</span>
            </motion.div>
          </div>
        );
      })}

    </div>
  );
}

function ThirdPanel({ onTransition }: { onTransition: (destBg: string, href: string) => void }) {
  return (
    <div
      className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#4C191B", zIndex: 3 }}
    >
      <RotatingPanels onTransition={onTransition} />
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [nameVariant, setNameVariant] = useState<NameVariant>("d1");
  const [transition, setTransition] = useState<{ destBg: string; href: string; shattering: boolean } | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const handleTransition = (destBg: string, href: string) => {
    setTransition({ destBg, href, shattering: true });
  };

  const handleShatterComplete = () => {
    if (transition) {
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        background-color: ${transition.destBg};
        pointer-events: none;
      `;
      document.body.appendChild(overlay);
      // Normal navigation — Next.js scrolls to top, overlay hides everything
      router.push(transition.href);
      // Fade out after page has loaded
      setTimeout(() => {
        overlay.style.transition = "opacity 1.2s ease";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 1300);
      }, 50);
    }
  };

  const nameVariants: NameVariant[] = ["d1", "d4", "d5"];
  const nameLabels: Record<NameVariant, string> = {
    d1: "Diagonal",
    d4: "Cascade",
    d5: "Inline",
  };

  return (
    <div style={{ background: "#FAF6F2" }}>
      {/* Variant toggles — top right */}
      <div
        className="fixed flex flex-col gap-2 z-50"
        style={{ top: "1.5rem", right: "1.5rem" }}
      >
        <div className="flex gap-2">
          {nameVariants.map((v) => (
            <button
              key={v}
              onClick={() => setNameVariant(v)}
              className="font-sans"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
                border: `1px solid ${nameVariant === v ? "#4C191B" : "rgba(76,25,27,0.2)"}`,
                background: nameVariant === v ? "#4C191B" : "rgba(250,246,242,0.9)",
                color: nameVariant === v ? "#FAF6F2" : "#4C191B",
                transition: "all 0.2s ease",
              }}
            >
              {nameLabels[v]}
            </button>
          ))}
        </div>
      </div>

      {/* Hero scroll wrapper */}
      <div
        ref={heroRef}
        style={{ height: "115vh", backgroundColor: "#FAF6F2" }}
      >
        <HeroPanel scrollYProgress={scrollYProgress} nameVariant={nameVariant} />
      </div>

      {/* Typography scroll wrapper */}
      <div style={{ height: "160vh", backgroundColor: "#B07DD4" }}>
        <TypographyPanel />
      </div>

      {/* Third panel scroll wrapper */}
      <div style={{ height: "120vh", backgroundColor: "#4C191B" }}>
        <ThirdPanel onTransition={handleTransition} />
      </div>

      {/* Full-screen fixed transition overlay */}
      {transition && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 9999, backgroundColor: transition.destBg }}
        >
          {transition.shattering && (
            <ShatterOverlay
              panelColors={PANEL_COLORS}
              onComplete={handleShatterComplete}
            />
          )}
        </div>
      )}

      <div className="grain" />
    </div>
  );
}
