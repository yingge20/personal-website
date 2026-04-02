"use client";

import { useRouter } from "next/navigation";
import { useRef, useCallback } from "react";

const cards = [
  {
    num: "01",
    title: "Distill",
    desc: "Insights and patterns uncovered in building AI systems",
    href: "/distill",
    className: "card-1",
  },
  {
    num: "02",
    title: "Shape",
    desc: "AI systems I design to guide behavior and decisions",
    href: "/shape",
    className: "card-2",
    bg: "var(--linen-mid)",
  },
  {
    num: "03",
    title: "Tenets",
    desc: "Principles that shape how I think and operate",
    href: "/tenets",
    className: "card-3",
  },
];

function Card({
  card,
  onClick,
}: {
  card: (typeof cards)[number];
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.transform = `perspective(1100px) rotateY(${dx * 5}deg) rotateX(${dy * -5}deg) scale(1.015)`;
      el.style.transition =
        "opacity 0.4s ease, transform 0.08s ease";
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1100px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.transition =
      "opacity 0.5s ease, transform 0.55s cubic-bezier(0.2,0,0,1), background 0.5s ease";
  }, []);

  // Gradient overlays per card
  const gradients: Record<string, string> = {
    "card-1":
      "radial-gradient(ellipse 60% 50% at 30% 70%, rgba(138,158,123,0.12) 0%, transparent 70%)",
    "card-2":
      "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(184,147,106,0.12) 0%, transparent 70%)",
    "card-3":
      "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(201,184,154,0.15) 0%, transparent 70%)",
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex-1 relative flex flex-col justify-end cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r"
      style={{
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3.5rem) clamp(2.5rem, 5vw, 4rem)",
        background: card.bg || "var(--linen)",
        borderColor: "var(--linen-deep)",
        transition: "background 0.5s ease",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        minHeight: "clamp(280px, 50vh, calc(100vh - 80px))",
      }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundImage: gradients[card.className] }}
      />

      <span
        className="absolute font-sans"
        style={{
          top: "clamp(1.5rem, 3vw, 3rem)",
          left: "clamp(1.5rem, 3vw, 3.5rem)",
          fontWeight: 300,
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          color: "var(--linen-deep)",
          transition: "color 0.4s ease",
        }}
      >
        {card.num}
      </span>

      <span
        className="absolute"
        style={{
          top: "clamp(1.5rem, 3vw, 3rem)",
          right: "clamp(1.5rem, 3vw, 3.5rem)",
          fontSize: "0.9rem",
          color: "var(--linen-deep)",
          transition:
            "color 0.3s ease, transform 0.4s cubic-bezier(0.2,0,0,1)",
        }}
      >
        ↗
      </span>

      <h2
        className="font-serif relative z-[1]"
        style={{
          fontWeight: 300,
          fontSize: "clamp(2.4rem, 4.5vw, 5.8rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: "1.1rem",
        }}
      >
        {card.title}
      </h2>

      <p
        className="font-sans relative z-[1]"
        style={{
          fontWeight: 300,
          fontSize: "0.8rem",
          lineHeight: 1.7,
          color: "var(--ink-soft)",
          maxWidth: "20ch",
        }}
      >
        {card.desc}
      </p>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--linen)" }}
    >
      {/* Nav */}
      <nav
        className="flex justify-between items-center shrink-0 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8"
      >
        <button
          onClick={() => router.push("/")}
          className="font-serif"
          style={{
            fontWeight: 400,
            fontSize: "1.05rem",
            letterSpacing: "0.12em",
            color: "var(--ink)",
            cursor: "pointer",
            border: "none",
            background: "none",
            padding: 0,
          }}
        >
          Ying Ge
        </button>
        <div className="flex" style={{ gap: "2.5rem" }}>
          <button
            onClick={() => router.push("/about")}
            className="font-sans nav-link-btn"
            style={{
              fontWeight: 300,
              fontSize: "0.76rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              transition: "color 0.25s ease",
            }}
          >
            About
          </button>
        </div>
      </nav>

      {/* Cards — stack vertically on mobile, horizontal on md+ */}
      <div
        className="flex flex-col md:flex-row flex-1"
        style={{ borderTop: "1px solid var(--linen-deep)" }}
      >
        {cards.map((card) => (
          <Card
            key={card.num}
            card={card}
            onClick={() => router.push(card.href)}
          />
        ))}
      </div>

      <div className="grain" />
    </div>
  );
}
