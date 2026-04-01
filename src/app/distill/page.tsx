"use client";

import { InnerLayout } from "@/components/inner-layout";

const entries = [
  {
    tag: "01 — Decision System",
    body: (
      <>
        Ask the same question twice.
        <br />
        You may get the same answer.
        <br />
        <br />
        But not the same reasoning.
        <br />
        <br />
        That&apos;s not a decision system.
        <br />
        <br />
        That&apos;s a sampling system.
        <br />
        <br />
        —
        <br />
        <br />
        A decision system is defined
        <br />
        by how knowledge is used.
        <br />
        <br />
        Without structure, <em className="not-italic font-serif" style={{ fontStyle: "italic", color: "var(--ink)" }}>it samples.</em>
        <br />
        <br />
        With structure,
        <br />
        <em className="not-italic font-serif" style={{ fontStyle: "italic", color: "var(--ink)" }}>it decides.</em>
      </>
    ),
  },
  {
    tag: "02 — A way I guide agents when the path is unknown",
    body: (
      <>
        Don&apos;t define the solution
        <br />
        when the path is still unknown.
        <br />
        <br />
        Ask.
        <br />
        <br />
        What are you assuming?
        <br />
        What breaks this?
        <br />
        What did you ignore?
        <br />
        What would another perspective say?
        <br />
        <br />
        Let it answer.
        <br />
        Then question again.
        <br />
        <br />
        Not to lead—
        <br />
        but to apply pressure.
        <br />
        <br />
        Surface assumptions.
        <br />
        Introduce counterexamples.
        <br />
        Shift perspectives.
        <br />
        Follow what doesn&apos;t resolve.
        <br />
        <br />
        Set only what must be true.
        <br />
        <br />
        Use separate passes.
        <br />
        Let them evaluate independently.
        <br />
        <br />
        Remove what doesn&apos;t hold.
        <br />
        <br />
        Until the answer
        <br />
        <em className="not-italic font-serif" style={{ fontStyle: "italic", color: "var(--ink)" }}>can stand on its own.</em>
      </>
    ),
  },
];

export default function DistillPage() {
  return (
    <InnerLayout
      title="Distill"
      subtitle="Insights and patterns uncovered in building AI systems"
    >
      <div className="flex flex-col" style={{ gap: "9rem", maxWidth: 640 }}>
        {entries.map((entry) => (
          <div key={entry.tag}>
            <div
              className="font-sans"
              style={{
                fontWeight: 400,
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: "2rem",
              }}
            >
              {entry.tag}
            </div>
            <div
              className="font-serif"
              style={{
                fontWeight: 300,
                fontSize: "1.2rem",
                lineHeight: 2.1,
                color: "var(--ink-mid)",
              }}
            >
              {entry.body}
            </div>
          </div>
        ))}
      </div>
    </InnerLayout>
  );
}
