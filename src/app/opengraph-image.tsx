import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Christian Amos - Systems & Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "80px",
          fontFamily: "sans-serif",
          border: "8px solid #0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "#042f2e",
              border: "1px solid #115e59",
              color: "#2dd4bf",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            System Status: Operational • Latency &lt; 30ms
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Christian Amos
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              maxWidth: "850px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Software Engineer specializing in Go Concurrency, Real-Time Audio Streaming, Spatial PostGIS Engines & Distributed Systems.
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {["Go", "TypeScript", "Next.js", "PostGIS", "Docker", "WebSockets"].map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                color: "#e2e8f0",
                fontSize: "18px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
