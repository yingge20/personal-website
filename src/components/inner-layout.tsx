"use client";

import { useRouter } from "next/navigation";

export function InnerLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "var(--linen)", padding: "2rem 3.5rem 8rem" }}>
      <nav className="flex justify-between items-center" style={{ marginBottom: "5rem" }}>
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

      <div
        style={{
          paddingBottom: "2.5rem",
          borderBottom: "1px solid var(--linen-deep)",
          marginBottom: "5.5rem",
        }}
      >
        <h1
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            marginBottom: "0.8rem",
          }}
        >
          {title}
        </h1>
        <p
          className="font-sans"
          style={{
            fontWeight: 300,
            fontSize: "0.78rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {children}

      <div className="grain" />
    </div>
  );
}
