import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "洞見 | 奧修禪卡抽牌 | OSHO Zen Card Read";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 215, 0, 0.15)",
            borderRadius: "16px",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: "80px",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          ☯︎
        </div>

        <div
          style={{
            fontSize: "16px",
            letterSpacing: "12px",
            color: "rgba(255, 215, 0, 0.6)",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          ZEN INSIGHT
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: "8px",
            marginBottom: "12px",
            display: "flex",
          }}
        >
          洞見
        </div>

        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)",
            marginBottom: "16px",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "4px",
            display: "flex",
          }}
        >
          奧修禪卡抽牌
        </div>
      </div>
    ),
    { ...size }
  );
}
