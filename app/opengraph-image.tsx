import { ImageResponse } from "next/og";

export const alt = "GutGuard Protocol";
export const contentType = "image/png";
export const runtime = "edge";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fbfaf7 0%, #eef2ff 45%, #dbeafe 100%)",
          color: "#08124a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: -1.5,
          }}
        >
          <span>Gut</span>
          <span style={{ color: "#1d23d8" }}>Guard</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div
            style={{
              alignSelf: "flex-start",
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              borderRadius: 999,
              color: "#ef4444",
              display: "flex",
              fontSize: 24,
              padding: "12px 18px",
            }}
          >
            68% of Philippine deaths start with chronic inflammation
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 0.95,
            }}
          >
            <span>Most supplements</span>
            <span>are a guess.</span>
            <span style={{ color: "#1d23d8" }}>Your blood is not.</span>
          </div>

          <div
            style={{
              color: "#374151",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 860,
            }}
          >
            Upload your existing blood results. Get your Lifestyle Inflammation Score. A doctor
            reviews and assigns your protocol.
          </div>
        </div>

        <div
          style={{
            color: "#4b5563",
            display: "flex",
            fontSize: 24,
            gap: 28,
          }}
        >
          <span>Doctor review within 24 hours</span>
          <span>Free shipping nationwide</span>
          <span>Any Philippine lab accepted</span>
        </div>
      </div>
    ),
    size,
  );
}
