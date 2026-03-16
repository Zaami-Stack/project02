import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Winklow - AI Prompt Engineering Platform";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at top left, rgba(52, 211, 153, 0.35), transparent 38%), radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.28), transparent 35%), #020617",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 30,
            fontWeight: 700
          }}
        >
          <div
            style={{
              height: 42,
              width: 42,
              borderRadius: 10,
              background: "#f8fafc",
              color: "#020617",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            }}
          >
            WK
          </div>
          Winklow
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05 }}>
            Enterprise Prompt Engineering Platform
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", lineHeight: 1.35 }}>
            Transform short ideas into structured, production-ready AI instructions.
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
