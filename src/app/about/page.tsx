"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const router = useRouter();
  const beltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const belt = beltRef.current;
    if (belt) {
      const original = belt.innerHTML;
      belt.innerHTML = original + original;
    }
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--linen)" }}
    >
      <nav
        className="flex justify-between items-center shrink-0"
        style={{ padding: "2rem 3rem" }}
      >
        <button
          onClick={() => router.push("/home")}
          className="font-sans"
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
          ← Home
        </button>
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
      </nav>

      {/* Photo belt */}
      <div
        className="flex-1 flex items-center overflow-hidden relative"
        style={{ padding: "3rem 0", minHeight: 480 }}
      >
        {/* Fade edges */}
        <div
          className="absolute top-0 bottom-0 left-0 z-[2] pointer-events-none"
          style={{
            width: 220,
            background:
              "linear-gradient(to right, var(--linen) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 z-[2] pointer-events-none"
          style={{
            width: 220,
            background:
              "linear-gradient(to left, var(--linen) 0%, transparent 100%)",
          }}
        />

        <div
          ref={beltRef}
          className="flex items-end"
          style={{
            gap: "1.8rem",
            animation: "belt-move 45s linear infinite",
            width: "max-content",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const sizes = [
              { w: 260, h: 360 },
              { w: 200, h: 280, mb: 40 },
              { w: 300, h: 400 },
              { w: 220, h: 320, mb: 20 },
            ];
            const s = sizes[i % 4];
            return (
              <div
                key={i}
                className="shrink-0 overflow-hidden flex items-center justify-center font-sans"
                style={{
                  width: s.w,
                  height: s.h,
                  marginBottom: "mb" in s ? s.mb : 0,
                  background:
                    "linear-gradient(135deg, var(--linen-mid) 0%, var(--linen-deep) 100%)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--linen-deep)",
                }}
              >
                photo
              </div>
            );
          })}
        </div>
      </div>

      {/* Bio */}
      <div
        className="flex justify-between items-end flex-wrap"
        style={{ padding: "2.5rem 3rem 4rem", gap: "4rem" }}
      >
        <div
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: "1.1rem",
            lineHeight: 1.9,
            color: "var(--ink-mid)",
            maxWidth: 480,
          }}
        >
          <p>
            I design systems that shape behavior, not just generate
            answers.
          </p>
          <p style={{ marginTop: "1rem" }}>
            My work sits at the intersection of AI, decision-making,
            and human experience — building tools that help people
            and organizations operate with greater clarity and
            precision.
          </p>
          <p style={{ marginTop: "1rem" }}>
            My background spans finance, accounting, and technology,
            shaping how I build: structured, detail-aware, and
            grounded in how things actually work.
          </p>
        </div>
      </div>

      <div className="grain" />
    </div>
  );
}
