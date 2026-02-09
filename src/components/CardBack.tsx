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
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        border: "1px solid rgba(255,215,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        transition: "transform 0.2s, box-shadow 0.2s",
        ...style,
        ...animStyle,
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(255,215,0,0.2)";
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
      }}
    >
      <div style={{
        position: "absolute",
        inset: 8,
        borderRadius: 8,
        border: "1px solid rgba(255,215,0,0.15)",
        background: "repeating-conic-gradient(rgba(255,215,0,0.03) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px",
      }} />
      <div style={{ fontSize: 32, opacity: 0.6 }}>☯</div>
    </div>
  );
}
