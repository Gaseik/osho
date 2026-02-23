import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a1a, #1a1a3a)",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            color: "rgba(255, 215, 0, 0.9)",
            display: "flex",
          }}
        >
          ☯︎
        </div>
      </div>
    ),
    { ...size }
  );
}
