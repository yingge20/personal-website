"use client";

import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

const tenets = [
  {
    number: "01",
    title: "Elegance is",
    titleBold: "restraint",
    titleBold2: "made ",
    titleAccent: "visible.",
    bg: "#4C191B",
    text: "#FFFFFF",
    textMuted: "rgba(255, 255, 255, 0.35)",
    accent: "#B07DD4",
    ghostColor: "rgba(255,255,255,0.04)",
    align: "right" as const,
  },
  {
    number: "02",
    title: "Pain is",
    titleBold: "automation",
    titleBold2: "without ",
    titleAccent: "intelligence.",
    bg: "#E3DAFF",
    text: "#4C191B",
    textMuted: "rgba(76, 25, 27, 0.3)",
    accent: "#963D5A",
    ghostColor: "rgba(76,25,27,0.05)",
    align: "left" as const,
  },
  {
    number: "03",
    title: "Willpower fades,",
    titleBold: "design",
    titleBold2: "",
    titleAccent: "endures.",
    bg: "#FAF6F2",
    text: "#4C191B",
    textMuted: "rgba(76, 25, 27, 0.25)",
    accent: "#963D5A",
    ghostColor: "rgba(76,25,27,0.04)",
    align: "right" as const,
  },
];

function TenetPanel({
  tenet,
  index,
}: {
  tenet: (typeof tenets)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isFirst = index === 0;
  const shouldAnimate = isFirst || isInView;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawParallax = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const parallaxY = useSpring(rawParallax, { stiffness: 40, damping: 30 });

  // On mobile: always center-align. On desktop: use configured alignment.
  const alignClass =
    tenet.align === "left"
      ? "items-center text-center sm:items-start sm:text-left"
      : tenet.align === "right"
        ? "items-center text-center sm:items-end sm:text-right"
        : "items-center text-center";

  // Consistent ghost number placement:
  // Always vertically centered, always on the opposite side of the text
  // Panel 1 (center text) → ghost top-right corner
  // Panel 2 (left text) → ghost right, vertically centered
  // Panel 3 (right text) → ghost left, vertically centered (mirror of 02)
  const ghostStyle: React.CSSProperties =
    tenet.align === "left"
      ? { top: "50%", right: "8%", transform: "translateY(-50%)" }
      : { top: "50%", left: "8%", transform: "translateY(-50%)" };

  return (
    <div
      ref={ref}
      className="sticky flex items-center justify-center overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24"
      style={{
        top: "80px",
        height: "max(75vh, 500px)",
        backgroundColor: tenet.bg,
        zIndex: index + 1,
      }}
    >
      {/* Ghost number — hidden on mobile, consistent size on desktop */}
      <motion.span
        className="absolute font-display select-none pointer-events-none hidden sm:block"
        style={{
          ...ghostStyle,
          fontSize: "clamp(10rem, 28vw, 24rem)",
          fontWeight: 900,
          lineHeight: 0.8,
          color: tenet.ghostColor,
        }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        {tenet.number}
      </motion.span>

      {/* Text block — all lines revealed together */}
      <motion.div
        className={`relative z-10 max-w-5xl w-full flex flex-col ${alignClass}`}
        initial={{ opacity: 0, y: 40 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-sans tracking-[0.35em] uppercase mb-6"
          style={{
            color: tenet.textMuted,
            fontSize: "0.7rem",
            fontWeight: 400,
          }}
        >
          TENET {tenet.number}
        </span>

        <motion.span
          className="font-serif"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
            fontWeight: 300,
            color: tenet.text,
            lineHeight: 1.2,
            opacity: 0.85,
            y: parallaxY,
          }}
        >
          {tenet.title}
        </motion.span>

        <span
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 8rem)",
            fontWeight: 800,
            color: tenet.text,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {tenet.titleBold}
        </span>

        <span
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 8rem)",
            fontWeight: 800,
            color: tenet.text,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {tenet.titleBold2}
          <span style={{ color: tenet.accent }}>
            {tenet.titleAccent}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export default function TenetsPage() {
  return (
    <div className="min-h-screen" style={{ background: tenets[0].bg }}>
      {/* Fixed Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12"
        style={{
          height: "80px",
          background: "rgba(76,25,27,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Monogram color="rgba(255,255,255,0.9)" />

        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <Link
            href="/about"
            className="font-sans no-underline"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              transition: "color 0.3s ease",
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            About
          </Link>
          <Link
            href="/distill"
            className="font-sans no-underline"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              transition: "color 0.3s ease",
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Distill
          </Link>
          <Link
            href="/shape"
            className="font-sans no-underline"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              transition: "color 0.3s ease",
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Shape
          </Link>
          <span
            className="font-sans"
            style={{
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              padding: "0.5rem 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Tenets
          </span>
        </nav>
      </header>

      <div style={{ height: "80px" }} />

      <div>
        {tenets.map((tenet, i) => (
          <div
            key={tenet.number}
            style={{
              height: i < tenets.length - 1 ? "85vh" : "150vh",
              backgroundColor: tenet.bg,
            }}
          >
            <TenetPanel tenet={tenet} index={i} />
          </div>
        ))}
      </div>

      <div className="grain" />
    </div>
  );
}
