"use client";

import { useRouter } from "next/navigation";
import { Monogram } from "@/components/monogram";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Floating photo gallery ── */
interface GalleryPhoto {
  top: string;
  right?: string;
  left?: string;
  w: string;
  h: string;
  src?: string;
  video?: string;
  hideOnMobile: boolean;
  objectPos?: string;
  filter?: string;
  z?: number;
}

/* Option A: "Warm Orbit" — plum/terracotta/gold, brand-aligned
   Layout: asymmetric overlapping clusters like Radiance.
   Left cluster: portrait (hero) + courtyard + bubble, tight overlap.
   Right cluster: purple (large) overlapping with spoon sculpture + wire network.
   Lantern floats lower-right. */
const photosA: GalleryPhoto[] = [
  // ── Left arc: shifted left to clear text ──
  // Portrait — HERO anchor (capped so it doesn't overflow on ultrawide)
  { top: "6vh",  left: "15%",  w: "min(22vw, 340px)", h: "36vh", src: "/portrait.jpg", objectPos: "center 20%", hideOnMobile: false, z: 3 },
  // Courtyard — warm pair with portrait, slight overlap on left edge
  { top: "24vh", left: "4%",   w: "min(12vw, 185px)", h: "26vh", src: "/IMG_0005 4.jpeg", objectPos: "center 60%", hideOnMobile: false, z: 4 },
  // Bubble — FLOATS solo, whitespace gap from pair
  { top: "50vh", left: "18%",  w: "min(11vw, 170px)", h: "13vh", video: "/bubble.mp4", hideOnMobile: true, z: 5 },
  // ── Right arc of circular frame ──
  // Purple — top-right arc anchor
  { top: "8vh",  right: "5%",  w: "min(18vw, 280px)", h: "28vh", src: "/purple-installation.jpg", hideOnMobile: false, z: 3 },
  // Wire — BIGGER, touches purple's bottom-left (dark pair), shows texture
  { top: "24vh", right: "16%", w: "min(16vw, 245px)", h: "14vh", src: "/wire-network.jpg", hideOnMobile: true, z: 4 },
  // Lantern — lower-right arc, warm accent balances warm left side
  { top: "54vh", right: "12%", w: "min(11vw, 170px)", h: "13vh", video: "/lantern.mp4", hideOnMobile: false, z: 5 },
  // Spoon — right arc, pulled further in from edge
  { top: "42vh", right: "4%",  w: "min(9vw, 140px)",  h: "36vh", src: "/IMG_5727.jpeg", objectPos: "center center", hideOnMobile: true, filter: "brightness(0.85) contrast(1.05)", z: 4 },
];


/* Single gallery item — enters with stagger, no independent float */
function GalleryItem({
  photo,
  index,
}: {
  photo: GalleryPhoto;
  index: number;
}) {
  const posStyle: React.CSSProperties = {
    top: photo.top,
    width: photo.w,
    height: photo.h,
    ...(photo.right ? { right: photo.right } : {}),
    ...(photo.left ? { left: photo.left } : {}),
  };

  return (
    <motion.div
      className={`absolute overflow-hidden select-none pointer-events-none ${photo.hideOnMobile ? "hidden sm:block" : ""}`}
      style={{ ...posStyle, zIndex: photo.z ?? 3 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { delay: 0.2 + index * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
        y: { delay: 0.2 + index * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {photo.video ? (
        <video
          src={photo.video}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <img
          src={photo.src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: photo.objectPos || "center",
            ...(photo.filter ? { filter: photo.filter } : {}),
          }}
        />
      )}
    </motion.div>
  );
}

/* Coordinated orbital wrapper — all images move together as one unit */
function GalleryOrbit({
  photos,
  scrollYProgress,
}: {
  photos: GalleryPhoto[];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rawY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useSpring(rawY, { stiffness: 40, damping: 30 });

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y }}
      animate={{
        x: [0, 18, 0, -18, 0],
        translateY: [0, -14, 0, 14, 0],
        rotate: [0, 0.4, 0, -0.4, 0],
      }}
      transition={{
        x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
        translateY: { duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 },
        rotate: { duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 },
      }}
    >
      {photos.map((photo, i) => (
        <GalleryItem key={i} photo={photo} index={i} />
      ))}
    </motion.div>
  );
}

function NameTypography() {
  const fontSize = "clamp(5rem, 20vw, 22rem)";
  const outline = { color: "transparent" as const, WebkitTextStroke: "2px #4C191B" };
  const filled = { color: "#4C191B" };
  const transition = { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const };
  const common = { fontWeight: 900, fontSize, lineHeight: 0.8, letterSpacing: "-0.05em", zIndex: 2 };

  return (
    <motion.div
      className="absolute font-display left-4 sm:left-[2vw] right-4 sm:right-[4vw] flex items-baseline gap-[0.15em]"
      style={{ bottom: "7vh", zIndex: 2 }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.95, y: 0 }} transition={transition}
    >
      <span style={{ ...common, ...outline }}>Ying</span>
      <span style={{ ...common, ...filled }}>Ge</span>
    </motion.div>
  );
}

function HeroPanel({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {

  return (
    <>
      {/* Desktop layout — original */}
      <div
        className="sticky top-0 h-screen overflow-hidden hidden sm:block"
        style={{ backgroundColor: "#FAF6F2", zIndex: 1 }}
      >
        {/* Max-width container keeps composition tight on ultrawide */}
        <div className="relative h-full mx-auto" style={{ maxWidth: "min(100%, 2200px)" }}>
          <div className="absolute z-10" style={{ top: "1.5rem", left: "1.5rem" }}>
            <Monogram color="#4C191B" />
          </div>

          <GalleryOrbit photos={photosA} scrollYProgress={scrollYProgress} />

          <NameTypography />

          <motion.div
            className="absolute z-10"
            style={{
              top: "30%",
              left: "42%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              maxWidth: "clamp(260px, 26vw, 400px)",
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
                fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                color: "#2A1520",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              I design systems that shape behavior, not just generate answers.{" "}
              My work sits at the intersection of{" "}
              <strong style={{ color: "#2A1520", fontWeight: 500 }}>
                AI, decision-making, and human experience
              </strong>
              .
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile layout — stacked vertically */}
      <div
        className="block sm:hidden"
        style={{ backgroundColor: "#FAF6F2", zIndex: 1 }}
      >
        {/* Monogram */}
        <div style={{ padding: "1.5rem" }}>
          <Monogram color="#4C191B" />
        </div>

        {/* Name — inline, responsive */}
        <motion.div
          className="font-display flex items-baseline gap-[0.1em]"
          style={{
            padding: "1rem 1.5rem 1.5rem",
            fontWeight: 900,
            fontSize: "clamp(4rem, 18vw, 6rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #4C191B" }}>Ying</span>
          <span style={{ color: "#4C191B" }}>Ge</span>
        </motion.div>

        {/* Orbital gallery cluster — circular arrangement around bio text */}
        <div style={{ position: "relative", height: "72vh", margin: "0" }}>
          {/* Portrait — large, top-left arc, rounded */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ width: "52vw", height: "34vh", top: "0", left: "2vw", borderRadius: "0 40% 4px 4px", zIndex: 2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: [0, 5, 0, -5, 0], translateY: [0, -4, 0, 4, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 0.8, delay: 0.3 },
              x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
              translateY: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5.5 },
            }}
          >
            <img src="/portrait.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          </motion.div>

          {/* Purple installation — top-right arc, rounded circle-ish */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ width: "38vw", height: "22vh", top: "2vh", right: "3vw", borderRadius: "40% 4px 40% 4px", zIndex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: [0, -6, 0, 6, 0], translateY: [0, 5, 0, -5, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.45 }, y: { duration: 0.8, delay: 0.45 },
              x: { duration: 19, repeat: Infinity, ease: "easeInOut" },
              translateY: { duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4.75 },
            }}
          >
            <img src="/purple-installation.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>

          {/* Bio text — centered in the composition */}
          <motion.div
            className="absolute"
            style={{ top: "36vh", left: "0", right: "0", padding: "0 2rem", textAlign: "center", zIndex: 3 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-sans block mb-3"
              style={{
                fontSize: "0.7rem",
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
                fontSize: "1.05rem",
                color: "#2A1520",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              I design systems that shape behavior, not just generate answers. My work sits at the intersection of{" "}
              <strong style={{ color: "#2A1520", fontWeight: 500 }}>
                AI, decision-making, and human experience
              </strong>
              .
            </p>
          </motion.div>

          {/* Lantern video — bottom-right arc, rounded */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ width: "42vw", height: "18vh", bottom: "0", right: "4vw", borderRadius: "4px 30% 4px 40%", zIndex: 2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: [0, 7, 0, -7, 0], translateY: [0, -5, 0, 5, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 0.8, delay: 0.6 },
              x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              translateY: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4.5 },
            }}
          >
            <video src="/lantern.mp4" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>

          {/* Bubble video — bottom-left arc, circle */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ width: "28vw", height: "28vw", bottom: "2vh", left: "4vw", borderRadius: "50%", zIndex: 3 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: [0, -5, 0, 5, 0], translateY: [0, 6, 0, -6, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.55 }, scale: { duration: 0.8, delay: 0.55 },
              x: { duration: 21, repeat: Infinity, ease: "easeInOut" },
              translateY: { duration: 21, repeat: Infinity, ease: "easeInOut", delay: 5.25 },
            }}
          >
            <video src="/bubble.mp4" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        </div>
      </div>
    </>
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
    <>
      {/* Desktop — sticky with scroll-driven animation */}
      <div
        ref={ref}
        className="sticky top-0 h-screen overflow-hidden hidden sm:block"
        style={{ backgroundColor: "#B07DD4", zIndex: 2 }}
      >
        <motion.p
          className="absolute font-display uppercase left-[6vw] max-w-[45vw]"
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

        <motion.p
          className="absolute font-display uppercase right-[6vw] text-right max-w-[40vw]"
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

      {/* Mobile — static layout, no scroll animation */}
      <div
        className="block sm:hidden flex flex-col justify-center px-6 py-16"
        style={{ backgroundColor: "#B07DD4", zIndex: 2, minHeight: "85vh" }}
      >
        <motion.p
          className="font-display uppercase"
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#2A1520",
            marginBottom: "2.5rem",
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          I&apos;m interested in how systems think, how they fail, and how to make them more consistent, reliable, and aligned with real-world complexity.
        </motion.p>

        <motion.p
          className="font-display uppercase"
          style={{
            fontWeight: 400,
            fontSize: "1.05rem",
            lineHeight: 1.4,
            letterSpacing: "0.03em",
            color: "#4C191B",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
    </>
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
    <>
      {/* Desktop — side by side */}
      <div className="hidden sm:flex w-full h-full relative">
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
              <div
                className="absolute inset-0"
                style={{ backgroundColor: PANEL_COLORS[i] }}
              />
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

      {/* Mobile — stacked full-width */}
      <div className="flex sm:hidden flex-col w-full relative">
        {workSections.map((s, i) => {
          const anySelected = selected !== null;
          return (
            <div
              key={s.key}
              className="relative cursor-pointer overflow-hidden"
              style={{
                height: "100vh",
                borderBottom: i < 2 ? "1px solid rgba(250,246,242,0.06)" : "none",
                zIndex: 6,
              }}
              onClick={() => handleClick(s.key, s.href, i)}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: PANEL_COLORS[i] }}
              />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 z-[3]"
                animate={{ opacity: anySelected ? 0 : 1 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="font-sans mb-4" style={{ fontSize: "0.8rem", letterSpacing: "0.3em", color: s.accent }}>{s.num}</span>
                <h3 className="font-display uppercase text-center" style={{ fontSize: "clamp(2.8rem, 12vw, 4rem)", fontWeight: 300, color: textColors[i], lineHeight: 1.05, letterSpacing: "0.08em" }}>{s.title}</h3>
                <div className="mt-5" style={{ width: 30, height: 1, backgroundColor: s.accent, opacity: 0.6 }} />
                <p className="font-sans text-center mt-5" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: subtextColors[i], fontWeight: 400, maxWidth: "28ch" }}>{s.desc}</p>
                <span className="font-sans mt-10" style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: hintColors[i] }}>Tap to enter</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ThirdPanel({ onTransition }: { onTransition: (destBg: string, href: string) => void }) {
  return (
    <div
      className="sm:sticky sm:top-0 sm:h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#4C191B", zIndex: 3 }}
    >
      <RotatingPanels onTransition={onTransition} />
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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

  return (
    <div style={{ background: "#FAF6F2" }}>

      {/* Hero scroll wrapper — auto height on mobile, fixed on desktop */}
      <div
        ref={heroRef}
        className="sm:h-[115vh]"
        style={{ backgroundColor: "#FAF6F2" }}
      >
        <HeroPanel scrollYProgress={scrollYProgress} />
      </div>

      {/* Typography scroll wrapper */}
      <div className="h-auto sm:h-[160vh]" style={{ backgroundColor: "#B07DD4" }}>
        <TypographyPanel />
      </div>

      {/* Third panel scroll wrapper — 300vh on mobile for 3 stacked panels */}
      <div className="h-auto sm:h-[120vh]" style={{ backgroundColor: "#4C191B" }}>
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
