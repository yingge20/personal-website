"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Variant = "a" | "b";

export default function LandingPage() {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("a");
  const [nameColor, setNameColor] = useState<"cream" | "orange">("cream");
  const [waving, setWaving] = useState(false);
  const mantraRef = useRef<HTMLParagraphElement>(null);

  function switchVariant(v: Variant, color: "cream" | "orange") {
    setVariant(v);
    setNameColor(color);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#0f2218", minHeight: "100vh" }}
    >
      {/* Water backgrounds */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-8%",
          backgroundImage: "url('/water.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.2) saturate(0.6)",
          mixBlendMode: "luminosity",
          opacity: 0.5,
          animation: "water-move 20s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-10%",
          backgroundImage: "url('/water.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.25) saturate(0.4)",
          opacity: 0.25,
          mixBlendMode: "screen",
          animation: "water-move-2 15s ease-in-out infinite alternate",
        }}
      />

      {/* Name */}
      <h1
        className="absolute font-display left-4 sm:left-10"
        style={{
          top: "8vh",
          zIndex: 6,
          fontWeight: 200,
          fontSize: "clamp(3.5rem, 13vw, 14rem)",
          letterSpacing: "-0.02em",
          color: nameColor === "cream" ? "#F0EBE0" : "#E8653A",
        }}
      >
        <em
          className="not-italic"
          style={{
            fontStyle: "italic",
            fontWeight: 200,
            fontSize: "1.12em",
            opacity: 0,
            animation: "land-fade 1.2s 0.3s ease forwards",
          }}
        >
          Ying
        </em>{" "}
        Ge
      </h1>

      {/* Window panel */}
      <div
        className="relative z-[4] flex flex-col items-center justify-center gap-6 sm:gap-10 w-[88vw] sm:w-[80vw] md:w-[72vw] h-[55vh] sm:h-[60vh] md:h-[64vh]"
        style={{
          marginTop: "14vh",
          opacity: 0,
          animation: "land-fade 1.6s 0.2s ease forwards",
          ...(variant === "a"
            ? {
                background: "rgba(18,38,28,0.65)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 0 120px rgba(255,255,255,0.02)",
              }
            : {
                background: "rgba(245,242,236,0.88)",
              }),
        }}
      >
        <p
          ref={mantraRef}
          onMouseEnter={() => setWaving(true)}
          onMouseLeave={() => setWaving(false)}
          className="font-serif"
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            letterSpacing: "0.08em",
            lineHeight: 2.2,
            textAlign: "center",
            opacity: 0,
            animation: "land-rise 1.4s 0.8s ease forwards",
            color: variant === "a" ? "#E8DFC4" : "var(--ink-mid)",
          }}
        >
          stillness to distill,
          <br />
          movement for direction
        </p>

        <button
          onClick={() => router.push("/home")}
          className="font-sans relative"
          style={{
            background: "none",
            border: "none",
            fontWeight: 400,
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "0.75rem 1.5rem",
            minHeight: "44px",
            opacity: 0,
            animation: "land-fade 1.2s 1.2s ease forwards",
            color:
              variant === "a"
                ? "rgba(255,255,255,0.3)"
                : "var(--ink-soft)",
          }}
        >
          enter
        </button>
      </div>

      {/* Bottom details */}
      <span
        className="absolute font-sans left-4 sm:left-8 md:left-12"
        style={{
          bottom: "2rem",
          zIndex: 5,
          fontWeight: 300,
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          opacity: 0,
          animation: "land-fade 1s 1.8s ease forwards",
        }}
      >
        Systems &middot; Design &middot; AI
      </span>
      <span
        className="absolute font-sans right-4 sm:right-8 md:right-12"
        style={{
          bottom: "2rem",
          zIndex: 5,
          fontWeight: 300,
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          opacity: 0,
          animation: "land-fade 1s 1.8s ease forwards",
        }}
      >
        &copy; 2026
      </span>

      {/* Variant toggle */}
      <div
        className="absolute flex gap-3"
        style={{
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          opacity: 0,
          animation: "land-fade 1s 2s ease forwards",
        }}
      >
        <button
          onClick={() => switchVariant("a", "cream")}
          className="font-sans"
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background:
              variant === "a" ? "rgba(255,255,255,0.12)" : "none",
            border: `1px solid ${variant === "a" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)"}`,
            color:
              variant === "a"
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.4)",
            padding: "0.5rem 1rem",
            minHeight: "44px",
            minWidth: "44px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          A
        </button>
        <button
          onClick={() => switchVariant("b", "orange")}
          className="font-sans"
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background:
              variant === "b" ? "rgba(255,255,255,0.12)" : "none",
            border: `1px solid ${variant === "b" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)"}`,
            color:
              variant === "b"
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.4)",
            padding: "0.5rem 1rem",
            minHeight: "44px",
            minWidth: "44px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          B
        </button>
      </div>

      {/* Grain */}
      <div className="grain" />
    </div>
  );
}
