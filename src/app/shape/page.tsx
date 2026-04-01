"use client";

import { InnerLayout } from "@/components/inner-layout";

function Msg({ speaker, agent, text }: { speaker: string; agent?: boolean; text: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: "0.35rem" }}>
      <span
        className="font-sans"
        style={{
          fontWeight: 400,
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: agent ? "var(--sage)" : "var(--sand)",
        }}
      >
        {speaker}
      </span>
      <span
        className="font-serif"
        style={{
          fontWeight: 300,
          fontSize: "1.15rem",
          lineHeight: 1.85,
          color: "var(--ink-mid)",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width: "1.5rem", height: 1, background: "var(--linen-deep)", margin: "2rem 0" }} />
  );
}

export default function ShapePage() {
  return (
    <InnerLayout
      title="Shape"
      subtitle="AI systems I design to guide behavior and decisions"
    >
      <div className="flex flex-col" style={{ gap: "9rem", maxWidth: 580 }}>
        {/* Shape 1 — Personal OS */}
        <div>
          <div
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "2.5rem",
            }}
          >
            01 — Personal OS
          </div>
          <div className="flex flex-col" style={{ gap: "2.2rem" }}>
            <Msg speaker="Me" text="create a moment for tonight" />
            <Msg
              speaker="Me"
              text={`this is striking…\n\nit replaces what's there\nwith how it feels\n\nI can't name it yet\n\nhow do I apply this in life?`}
            />
            <Msg
              speaker="Agent"
              agent
              text={`Don't rush that part\n\nWhere does the label\nget in the way of the feeling?`}
            />
            <Msg speaker="Me" text={`identity\njob titles\nexes`} />
            <Msg speaker="Agent" agent text="what gets lost?" />
            <Msg speaker="Me" text={`label diminishes the person\n\nit's narrow`} />
            <Msg
              speaker="Agent"
              agent
              text={`remove the label\n\noffer the felt experience\n\nthings become fuller`}
            />
          </div>
          <div
            className="font-serif"
            style={{
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--linen-deep)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.25rem",
              color: "var(--ink)",
            }}
          >
            I&apos;m building a system that shapes how I live,
            <br />
            not just what I do.
          </div>
        </div>

        {/* Shape 2 — OpenClaw */}
        <div>
          <div
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--amber)",
              marginBottom: "2.5rem",
            }}
          >
            02 — Setting up OpenClaw with zero trust
          </div>

          <div className="font-sans" style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "0.8rem" }}>
            Scene 1 — Zero surface area
          </div>
          <div className="font-serif" style={{ fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.9, color: "var(--ink-mid)", whiteSpace: "pre-line" }}>
            {`tools enabled: none\n\nfile access: denied\nweb: denied\nshell: denied\nnetwork: localhost only\n\nthe agent can receive text\nand reply with text\n\nnothing else`}
          </div>

          <Divider />

          <div className="font-sans" style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "0.8rem" }}>
            Scene 2 — First door
          </div>
          <div className="font-serif" style={{ fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.9, color: "var(--ink-mid)", whiteSpace: "pre-line" }}>
            {`enable memory\nworkspace: read → write\nscope: workspace only`}
          </div>
          <div className="font-serif" style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: "var(--ink)", marginTop: "1rem" }}>
            a notepad inside a sealed room<br />the room didn&apos;t get bigger
          </div>

          <Divider />

          <div className="font-sans" style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "0.8rem" }}>
            Scene 3 — Selective expansion
          </div>
          <div className="font-serif" style={{ fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.9, color: "var(--ink-mid)", whiteSpace: "pre-line" }}>
            {`enable web search\nread-only\nno external actions`}
          </div>
          <div className="font-serif" style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: "var(--ink)", marginTop: "1rem" }}>
            the risk was named before the door was opened
          </div>

          <Divider />

          <div className="font-sans" style={{ fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "0.8rem" }}>
            Scene 4 — Final state
          </div>
          <div className="font-serif" style={{ fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.9, color: "var(--ink-mid)", whiteSpace: "pre-line" }}>
            {`running task...\n\nwithin defined scope\nno external calls\nall actions logged\n\ntask completed`}
          </div>
          <div className="font-serif" style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: "var(--ink)", marginTop: "1rem" }}>
            nothing ran that wasn&apos;t designed
          </div>

          <div
            className="font-serif"
            style={{
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--linen-deep)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.25rem",
              color: "var(--ink)",
            }}
          >
            I build walls first.
            <br />
            Then I choose what to remove.
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
