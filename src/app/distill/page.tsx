"use client";

import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

/* ─── Content ─── */
const entries = [
  {
    num: "01",
    tag: "Decision System",
    context:
      "From building an accounting knowledge Q\u0026A system, I learned that the same question, asked twice, can produce different reasoning paths. The answer might match, but the logic behind it shifts. That inconsistency undermines reliability. The fix was giving the model the right structure to reason within.",
    lines: [
      { text: "Ask the model same question twice.", type: "normal" as const },
      { text: "You may get the same answer.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "But not the same reasoning.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "That\u2019s not a decision system.", type: "normal" as const },
      { text: "That\u2019s a sampling system.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "\u2014", type: "divider" as const },
      { text: "", type: "break" as const },
      { text: "A decision system is defined", type: "normal" as const },
      { text: "by how knowledge is used.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Without structure,", type: "normal" as const },
      { text: "it samples.", type: "italic" as const },
      { text: "", type: "break" as const },
      { text: "With structure,", type: "normal" as const },
      { text: "it decides.", type: "italic" as const },
    ],
  },
  {
    num: "02",
    tag: "When the path is unknown",
    context:
      "A method I developed for guiding coding agents through ambiguous problems, where the solution can\u2019t be prescribed because the territory hasn\u2019t been mapped yet.",
    lines: [
      { text: "Don\u2019t define the solution", type: "normal" as const },
      { text: "when the path is still unknown.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Ask.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "What are you assuming?", type: "normal" as const },
      { text: "What breaks this?", type: "normal" as const },
      { text: "What did you ignore?", type: "normal" as const },
      { text: "What would another perspective say?", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Let it answer.", type: "normal" as const },
      { text: "Then question again.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Not to lead\u2014", type: "normal" as const },
      { text: "but to apply pressure.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Surface assumptions.", type: "normal" as const },
      { text: "Introduce counterexamples.", type: "normal" as const },
      { text: "Shift perspectives.", type: "normal" as const },
      { text: "Follow what doesn\u2019t resolve.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Set only what must be true.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Use separate passes.", type: "normal" as const },
      { text: "Let them evaluate independently.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Remove what doesn\u2019t hold.", type: "normal" as const },
      { text: "", type: "break" as const },
      { text: "Until the answer", type: "normal" as const },
      { text: "can stand on its own.", type: "italic" as const },
    ],
  },
];

type Variant = "cards" | "typewriter" | "manuscript";

/* ─── A: Cards on a Table ─── */

function RevealLine({
  line,
  index,
}: {
  line: (typeof entries)[number]["lines"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (line.type === "break") return <div style={{ height: "1.6rem" }} />;
  if (line.type === "divider")
    return (
      <motion.div
        ref={ref}
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ duration: 0.8, delay: index * 0.04 }}
        style={{ margin: "0.5rem 0" }}
      >
        <div style={{ width: 36, height: 1, background: "#B07DD4" }} />
      </motion.div>
    );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className="font-serif"
      style={{
        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
        lineHeight: 2.1,
        textAlign: "center",
        color: line.type === "italic" ? "#4C191B" : "#5C4555",
        fontStyle: line.type === "italic" ? "italic" : "normal",
        fontWeight: line.type === "italic" ? 400 : 300,
      }}
    >
      {line.text}
    </motion.div>
  );
}

function FloatingCard({
  entry,
  index,
}: {
  entry: (typeof entries)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Springy parallax — card and context float at different rates, like the photo gallery
  const rawCardY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const cardY = useSpring(rawCardY, { stiffness: 40, damping: 30 });
  const rawContextY = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const contextY = useSpring(rawContextY, { stiffness: 35, damping: 25 });

  const styles = [
    {
      cardBg: "#FAF6F2",
      cardBorder: "rgba(76,25,27,0.06)",
      contextBg: "#4C191B",
      contextColor: "rgba(250,246,242,0.75)",
      tagColor: "#963D5A",
      cardRotate: "-1deg",
      // Card 1: slightly left of center
      offset: { marginLeft: "clamp(2rem, 6vw, 6rem)", marginRight: "auto" },
      // Context sits outside card, only edge overlapping
      contextPos: {
        bottom: "-6rem",
        right: "-8rem",
      },
      contextRotate: "1.5deg",
    },
    {
      cardBg: "#E3DAFF",
      cardBorder: "rgba(176,125,212,0.15)",
      contextBg: "#963D5A",
      contextColor: "rgba(250,246,242,0.8)",
      tagColor: "#B07DD4",
      cardRotate: "0.8deg",
      // Card 2: slightly right of center, close to center
      offset: { marginLeft: "auto", marginRight: "clamp(6rem, 14vw, 16rem)" },
      // Context 1/3 down the card, left side, mostly outside
      contextPos: {
        top: "30%",
        left: "-14rem",
      },
      contextRotate: "-1.2deg",
    },
  ];

  const s = styles[index];

  return (
    <div
      ref={ref}
      className="relative px-4 sm:px-6"
      style={{
        maxWidth: 820,
        width: "100%",
        ...s.offset,
      }}
    >
      {/* Card with springy parallax */}
      <motion.div
        style={{
          y: cardY,
          position: "relative",
          zIndex: 1,
          background: s.cardBg,
          padding: "clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 5rem)",
          boxShadow: "0 6px 50px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
          border: `1px solid ${s.cardBorder}`,
          rotate: s.cardRotate,
        }}
      >
        {/* Tag — centered */}
        <div
          className="font-sans text-center"
          style={{
            fontWeight: 400,
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: s.tagColor,
            marginBottom: "2.5rem",
          }}
        >
          {entry.num} — {entry.tag}
        </div>

        {/* Lines — centered */}
        {entry.lines.map((line, li) => (
          <RevealLine key={li} line={line} index={li} />
        ))}
      </motion.div>

      {/* Large decorative number in the empty space */}
      <div
        className="font-display hidden sm:block absolute select-none pointer-events-none"
        style={{
          fontSize: "clamp(10rem, 18vw, 16rem)",
          fontWeight: 200,
          lineHeight: 1,
          color: "rgba(76,25,27,0.04)",
          top: "10%",
          ...(index === 0 ? { right: "-18rem" } : { left: "-18rem" }),
        }}
      >
        {entry.num}
      </div>

      {/* Context block with springy parallax */}
      <motion.div
        className="font-sans hidden sm:block"
        style={{
          y: contextY,
          position: "absolute",
          zIndex: 2,
          ...s.contextPos,
          width: "clamp(320px, 34vw, 400px)",
          background: s.contextBg,
          padding: "clamp(2rem, 3vw, 2.5rem)",
          fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
          lineHeight: 1.85,
          color: s.contextColor,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          rotate: s.contextRotate,
        }}
      >
        {entry.context}
      </motion.div>

      {/* Context block — mobile */}
      <div
        className="font-sans block sm:hidden"
        style={{
          background: s.contextBg,
          padding: "1.5rem",
          fontSize: "0.9rem",
          lineHeight: 1.8,
          color: s.contextColor,
        }}
      >
        {entry.context}
      </div>
    </div>
  );
}

function CardsVariant() {
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "14rem", background: "#F5F0F6" }}>
      {/* Page title */}
      <div className="px-6 sm:px-12 md:px-20" style={{ marginBottom: "5rem" }}>
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
          Distill
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
          Insights and patterns uncovered through building AI systems.
          Each piece captures a moment where something clicked — a principle
          that emerged from practice, not theory.
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: "clamp(8rem, 14vw, 14rem)" }}>
        {entries.map((entry, i) => (
          <FloatingCard key={entry.num} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── C: Typewriter / Progressive Disclosure ─── */

function TypewriterLine({
  line,
  index,
}: {
  line: (typeof entries)[number]["lines"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  if (line.type === "break") return <div style={{ height: "2rem" }} />;
  if (line.type === "divider")
    return (
      <motion.div
        ref={ref}
        style={{ margin: "1rem 0" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div style={{ width: 40, height: 1, background: "#B07DD4", opacity: 0.5 }} />
      </motion.div>
    );

  const isClosing = line.type === "italic";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="font-serif"
      style={{
        fontSize: isClosing ? "clamp(1.3rem, 2vw, 1.55rem)" : "clamp(1.15rem, 1.8vw, 1.4rem)",
        lineHeight: 2.2,
        color: isClosing ? "#4C191B" : "#5C4555",
        fontStyle: isClosing ? "italic" : "normal",
        fontWeight: isClosing ? 400 : 300,
      }}
    >
      {line.text}
    </motion.div>
  );
}

function TypewriterVariant() {
  return (
    <div style={{ background: "#F5F0F6" }}>
      {/* Page title — first screen */}
      <section
        className="flex flex-col justify-end px-6 sm:px-12 md:px-20"
        style={{ minHeight: "60vh", paddingTop: "120px", paddingBottom: "4rem" }}
      >
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
          Distill
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
          Insights and patterns uncovered through building AI systems.
          Each piece captures a moment where something clicked — a principle
          that emerged from practice, not theory.
        </p>
      </section>

      {entries.map((entry, i) => (
        <section
          key={entry.num}
          className="relative flex flex-col items-center justify-center px-6"
          style={{
            minHeight: "100vh",
            paddingTop: "6rem",
            paddingBottom: "8rem",
          }}
        >
          {/* Vertical connector */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              height: 60,
              background: "rgba(176,125,212,0.2)",
            }}
          />

          <div style={{ maxWidth: 580, width: "100%" }}>
            {/* Tag */}
            <motion.div
              className="font-sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#963D5A",
                marginBottom: "1.5rem",
              }}
            >
              {entry.num} \u2014 {entry.tag}
            </motion.div>

            {/* Context */}
            <motion.p
              className="font-sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.8,
                color: "rgba(76,25,27,0.5)",
                maxWidth: "48ch",
                marginBottom: "3rem",
              }}
            >
              {entry.context}
            </motion.p>

            {/* Lines */}
            {entry.lines.map((line, li) => (
              <TypewriterLine key={li} line={line} index={li} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ─── D: Floating Manuscript Pages ─── */

function ManuscriptPage({
  entry,
  index,
}: {
  entry: (typeof entries)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const rotations = [-1.2, 0.8];

  return (
    <motion.div
      ref={ref}
      className="w-full mx-4 sm:mx-0"
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotations[index] } : {}}
      whileHover={{ rotate: 0, scale: 1.015, y: -4 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: "#FAF6F2",
        padding: "clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 5rem)",
        maxWidth: 620,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.12)",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Number — top right */}
      <div
        className="font-sans"
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 2.5rem)",
          right: "clamp(1.5rem, 3vw, 2.5rem)",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(76,25,27,0.2)",
          fontWeight: 400,
        }}
      >
        {entry.num}
      </div>

      {/* Tag */}
      <div
        className="font-sans"
        style={{
          fontWeight: 400,
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#963D5A",
          marginBottom: "2.5rem",
          opacity: 0.6,
        }}
      >
        {entry.tag}
      </div>

      {/* Body */}
      {entry.lines.map((line, li) => {
        if (line.type === "break") return <div key={li} style={{ height: "1.4rem" }} />;
        if (line.type === "divider")
          return (
            <div key={li} style={{ margin: "0.5rem 0" }}>
              <div style={{ width: 30, height: 1, background: "#B07DD4", opacity: 0.3 }} />
            </div>
          );
        return (
          <div
            key={li}
            className="font-serif"
            style={{
              fontSize: "clamp(1.1rem, 1.6vw, 1.25rem)",
              lineHeight: 2.1,
              color: line.type === "italic" ? "#4C191B" : "#5C4555",
              fontStyle: line.type === "italic" ? "italic" : "normal",
              fontWeight: line.type === "italic" ? 400 : 300,
            }}
          >
            {line.text}
          </div>
        );
      })}

      {/* Context — bottom of card */}
      <div
        className="font-sans"
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(76,25,27,0.06)",
          fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
          lineHeight: 1.8,
          color: "rgba(76,25,27,0.4)",
          maxWidth: "44ch",
        }}
      >
        {entry.context}
      </div>
    </motion.div>
  );
}

function ManuscriptVariant() {
  return (
    <div
      style={{
        background: "#2A1520",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "10rem",
      }}
    >
      {/* Page title */}
      <div className="px-6 sm:px-12 md:px-20" style={{ marginBottom: "3rem" }}>
        <h1
          className="font-display uppercase"
          style={{
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            letterSpacing: "0.08em",
            color: "rgba(250,246,242,0.9)",
            marginBottom: "1rem",
          }}
        >
          Distill
        </h1>
        <p
          className="font-sans"
          style={{
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            lineHeight: 1.8,
            color: "rgba(250,246,242,0.35)",
            maxWidth: "50ch",
          }}
        >
          Insights and patterns uncovered through building AI systems.
          Each piece captures a moment where something clicked — a principle
          that emerged from practice, not theory.
        </p>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-6" style={{ gap: "4rem" }}>
        {entries.map((entry, i) => (
          <ManuscriptPage key={entry.num} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function DistillPage() {
  const [variant, setVariant] = useState<Variant>("cards");

  const variantLabels: Record<Variant, string> = {
    cards: "Cards",
    typewriter: "Typewriter",
    manuscript: "Manuscript",
  };

  const isDark = variant === "manuscript";
  const headerBg = isDark ? "rgba(42,21,32,0.9)" : "rgba(245,240,246,0.85)";
  const headerTextColor = isDark ? "rgba(250,246,242,0.45)" : "rgba(76,25,27,0.45)";
  const headerActiveColor = isDark ? "rgba(250,246,242,0.9)" : "rgba(76,25,27,0.9)";
  const monogramColor = isDark ? "rgba(250,246,242,0.9)" : "#4C191B";

  return (
    <div>
      {/* Header */}
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
          <Link
              href="/about"
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
              onMouseEnter={(e) => (e.currentTarget.style.color = headerActiveColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = headerTextColor)}
            >
              About
            </Link>
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
            Distill
          </span>
          {[
            { href: "/shape", label: "Shape" },
            { href: "/tenets", label: "Tenets" },
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
              onMouseEnter={(e) => (e.currentTarget.style.color = headerActiveColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = headerTextColor)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Variant toggle */}
      <div
        className="fixed flex gap-2 z-50"
        style={{ top: "100px", right: "1.5rem" }}
      >
        {(Object.keys(variantLabels) as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className="font-sans"
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              border: `1px solid ${variant === v ? "#4C191B" : "rgba(76,25,27,0.2)"}`,
              background: variant === v ? "#4C191B" : "rgba(250,246,242,0.9)",
              color: variant === v ? "#FAF6F2" : "#4C191B",
              transition: "all 0.2s ease",
            }}
          >
            {variantLabels[v]}
          </button>
        ))}
      </div>

      {/* Variants */}
      {variant === "cards" && <CardsVariant />}
      {variant === "typewriter" && <TypewriterVariant />}
      {variant === "manuscript" && <ManuscriptVariant />}

      <div className="grain" />
    </div>
  );
}
