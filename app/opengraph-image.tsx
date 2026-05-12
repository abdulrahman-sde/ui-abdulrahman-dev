import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kairo UI - Free landing page templates";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        backgroundImage:
          "radial-gradient(circle at 2px 2px, #f0f0f0 1px, transparent 0)",
        backgroundSize: "40px 40px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Isometric Grid Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          opacity: 0.4,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 46"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <path
                d="M 0 23 L 80 23"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <path
                d="M 40 0 L 40 46"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            transform="skewY(-15)"
          />
        </svg>
      </div>

      {/* Floating Blocks (Simplified 3D-ish SVG) */}
      <div
        style={{ position: "absolute", top: 120, left: 150, display: "flex" }}
      >
        <Block color="#bfdbfe" size={60} />
      </div>
      <div
        style={{ position: "absolute", top: 80, right: 200, display: "flex" }}
      >
        <Block color="#ddd6fe" size={50} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 220,
          display: "flex",
        }}
      >
        <Block color="#fef08a" size={70} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 180,
          display: "flex",
        }}
      >
        <Block color="#bbf7d0" size={55} />
      </div>
      <div
        style={{ position: "absolute", top: 300, right: 80, display: "flex" }}
      >
        <Block color="#fed7aa" size={45} />
      </div>

      {/* Logo (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#000",
            width: 52,
            height: 52,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 7.5v13M8 14l6.5-6.5M8 14l7 7" />
          </svg>
        </div>
        <span
          style={{
            marginLeft: 16,
            fontSize: 32,
            fontWeight: 700,
            color: "#000",
            letterSpacing: "-0.03em",
          }}
        >
          Kairo UI
        </span>
      </div>

      {/* Headline (Center) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: "#000",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.05em",
          }}
        >
          Free landing page templates
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 24,
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          Modern, Next.js Templates for your next project.
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

function Block({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -size / 4,
          left: size / 4,
          width: size,
          height: size / 2,
          background: "rgba(0,0,0,0.05)",
          borderRadius: "50%",
          filter: "blur(4px)",
          transform: "skewX(-30deg)",
        }}
      />
      {/* Cube 2D Representation */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}
      >
        <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill={color} />
        <path d="M50 0 L100 25 L50 50 L0 25 Z" fill="rgba(255,255,255,0.3)" />
        <path
          d="M50 50 L100 75 L100 25 L50 0 Z"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1"
        />
        <path
          d="M50 50 L0 75 L0 25 L50 0 Z"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
