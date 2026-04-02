import Link from "next/link";

export function Monogram({
  color = "#4C191B",
  href = "/home",
}: {
  color?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="flex items-baseline no-underline">
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
    </Link>
  );
}
