"use client";

import { CSSProperties } from "react";

interface CardBackProps {
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
  animStyle?: CSSProperties;
  ready?: boolean;
}

export default function CardBack({
  style,
  onClick,
  className = "",
  animStyle = {},
  ready = false,
}: CardBackProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${ready && onClick ? 'animate-glow' : ''}`}
      style={{
        width: 140,
        height: 210,
        borderRadius: 12,
        cursor: onClick ? "pointer" : "default",
        border: "1px solid rgba(255,215,0,0.3)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
        ...style,
        ...animStyle,
      }}
    >
      <img
        src="/assets/cardback.jpeg"
        alt="card back"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "inherit",
          display: "block",
        }}
      />
    </div>
  );
}
