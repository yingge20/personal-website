"use client";

export function LinkedInFooter() {
  return (
    <footer
      className="fixed bottom-0 right-0 z-40 flex items-center"
      style={{ padding: "1rem 1.5rem" }}
    >
      <a
        href="https://www.linkedin.com/in/yingge1/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans no-underline"
        style={{
          fontSize: "0.8rem",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "rgba(76,25,27,0.85)",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "rgba(76,25,27,1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(76,25,27,0.85)")
        }
      >
        LinkedIn
      </a>
    </footer>
  );
}
