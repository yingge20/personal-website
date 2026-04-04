export function Monogram({
  color = "#4C191B",
}: {
  color?: string;
}) {
  return (
    <div className="flex items-baseline">
      <span
        className="font-display"
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          color,
        }}
      >
        Y
      </span>
      <span
        className="font-display"
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
          fontWeight: 500,
          color,
          margin: "0 3px",
        }}
      >
        —
      </span>
      <span
        className="font-display"
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          color,
        }}
      >
        G
      </span>
    </div>
  );
}
