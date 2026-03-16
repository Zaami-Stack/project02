import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Winklow platform preview";
export const size = {
  width: 1200,
  height: 600
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top right, rgba(16, 185, 129, 0.28), transparent 34%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.24), transparent 30%), #020617",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#a7f3d0" }}>Winklow</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 880 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.08 }}>Premium Prompt Generation for Modern AI Teams</div>
          <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.35 }}>
            Secure quotas, structured outputs, and deployment-ready instructions from one simple prompt.
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
