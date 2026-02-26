"use client";

import { TarotCard, getSuitLabel } from "../data/tarot-cards";

interface TarotCardFaceProps {
  card: TarotCard;
  isReversed?: boolean;
  label?: string;
  small?: boolean;
  locale?: string;
}

const SUIT_SYMBOLS: Record<string, string> = {
  wands: "🪄",
  cups: "🏆",
  swords: "⚔️",
  pentacles: "⭐",
};

const SUIT_COLORS: Record<string, string> = {
  wands: "linear-gradient(135deg, #2d1a0a 0%, #6b3a1a 50%, #1f140c 100%)",
  cups: "linear-gradient(135deg, #0c1445 0%, #1b3a6b 50%, #0a1628 100%)",
  swords: "linear-gradient(135deg, #1a1a2e 0%, #4a4a6b 50%, #0f0f1f 100%)",
  pentacles: "linear-gradient(135deg, #0a2e1a 0%, #2a6b3a 50%, #0c1f14 100%)",
};

export default function TarotCardFace({ card, isReversed, label, small, locale = "zh-TW" }: TarotCardFaceProps) {
  const isZh = locale.startsWith("zh");
  const cardName = isZh ? card.name.zh : card.name.en;
  const suitSymbol = card.suit ? SUIT_SYMBOLS[card.suit] || "" : "✦";
  const bg = card.arcana === "major"
    ? "linear-gradient(135deg, #1a0533 0%, #3d1b69 50%, #0f0c29 100%)"
    : SUIT_COLORS[card.suit || ""] || "linear-gradient(135deg, #1a1a2e 0%, #3a3a6b 50%, #0f0f1f 100%)";

  const w = small ? 80 : 140;
  const h = small ? 120 : 210;

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: small ? 8 : 12,
        background: bg,
        border: "1px solid rgba(180, 160, 220, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: small ? 6 : 12,
        textAlign: "center",
        boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
        transform: isReversed ? "rotate(180deg)" : "none",
      }}
    >
      {/* Inner border */}
      <div
        style={{
          position: "absolute",
          inset: small ? 4 : 6,
          borderRadius: small ? 5 : 8,
          border: "1px solid rgba(180, 160, 220, 0.2)",
        }}
      />

      {/* Position label */}
      {label && (
        <div
          style={{
            fontSize: small ? 8 : 10,
            color: "rgba(180, 160, 220, 0.7)",
            marginBottom: 2,
            letterSpacing: 2,
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
            transform: isReversed ? "rotate(180deg)" : "none",
          }}
        >
          {label}
        </div>
      )}

      {/* Suit symbol or arcana indicator */}
      <div style={{ fontSize: small ? 20 : 32, marginBottom: small ? 4 : 8, position: "relative", zIndex: 1 }}>
        {card.arcana === "major" ? "✦" : suitSymbol}
      </div>

      {/* Card number */}
      <div
        style={{
          fontSize: small ? 9 : 11,
          color: "rgba(180, 160, 220, 0.6)",
          marginBottom: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        {card.arcana === "major"
          ? toRoman(card.number)
          : card.suit
            ? `${getSuitLabel(card.suit, locale)} ${card.number === 1 ? "Ace" : card.number > 10 ? ["", "Page", "Knight", "Queen", "King"][card.number - 10] : card.number}`
            : ""}
      </div>

      {/* Card name */}
      <div
        style={{
          fontSize: small ? 10 : 14,
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {cardName}
      </div>

      {/* Keywords (not on small cards) */}
      {!small && (
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.45)",
            marginTop: 8,
            lineHeight: 1.4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {(isZh ? card.keywords.zh : card.keywords.en).slice(0, 3).join(" · ")}
        </div>
      )}
    </div>
  );
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [21, "XXI"], [20, "XX"], [19, "XIX"], [18, "XVIII"], [17, "XVII"],
    [16, "XVI"], [15, "XV"], [14, "XIV"], [13, "XIII"], [12, "XII"],
    [11, "XI"], [10, "X"], [9, "IX"], [8, "VIII"], [7, "VII"],
    [6, "VI"], [5, "V"], [4, "IV"], [3, "III"], [2, "II"], [1, "I"], [0, "0"],
  ];
  for (const [val, roman] of map) {
    if (num >= val) return roman;
  }
  return String(num);
}
