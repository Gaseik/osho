"use client";

import { useState } from "react";
import { TarotCard } from "../data/tarot-cards";

interface TarotCardFaceProps {
  card: TarotCard;
  label?: string;
  small?: boolean;
  reversed?: boolean;
}

const ROMAN_NUMERALS = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
];

const SUIT_SYMBOLS: Record<string, string> = {
  wands: '🜂',
  cups: '🜄',
  swords: '🜁',
  pentacles: '🜃',
};

const ARCANA_GRADIENTS = {
  major: 'linear-gradient(160deg, #0c0a2a 0%, #1a1050 40%, #2a1860 70%, #0e0825 100%)',
  wands: 'linear-gradient(160deg, #1a0a00 0%, #3d1a00 40%, #5c2a0a 70%, #1a0800 100%)',
  cups: 'linear-gradient(160deg, #000a1a 0%, #001a3d 40%, #0a2a5c 70%, #00081a 100%)',
  swords: 'linear-gradient(160deg, #0a0a14 0%, #1a1a30 40%, #2a2a4a 70%, #08080f 100%)',
  pentacles: 'linear-gradient(160deg, #0a1a00 0%, #1a3d00 40%, #2a5c0a 70%, #081a00 100%)',
};

export default function TarotCardFace({ card, label, small, reversed }: TarotCardFaceProps) {
  const [imageError, setImageError] = useState(false);

  const width = small ? 100 : 140;
  const height = small ? 150 : 210;
  const romanNumeral = card.arcana === 'major' ? ROMAN_NUMERALS[card.number] : undefined;
  const suitSymbol = card.suit ? SUIT_SYMBOLS[card.suit] : undefined;
  const gradientKey = card.suit ?? (card.arcana === 'major' ? 'major' : 'major');
  const gradient = ARCANA_GRADIENTS[gradientKey as keyof typeof ARCANA_GRADIENTS] ?? ARCANA_GRADIENTS.major;

  // Try to show image first
  if (!imageError) {
    return (
      <div style={{
        width,
        height,
        borderRadius: 12,
        border: "1px solid rgba(255,215,0,0.5)",
        overflow: "hidden",
        boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
        position: "relative",
        background: "#000",
        transform: reversed ? 'rotate(180deg)' : undefined,
      }}>
        <img
          src={card.image}
          alt={card.name.en}
          width={width}
          height={height}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  // Placeholder: CSS card with name + number + suit symbol
  return (
    <div style={{
      width,
      height,
      borderRadius: 12,
      background: gradient,
      border: "1px solid rgba(255,215,0,0.4)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: small ? 8 : 12,
      textAlign: "center",
      boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
      position: "relative",
      overflow: "hidden",
      transform: reversed ? 'rotate(180deg)' : undefined,
    }}>
      {/* Inner border */}
      <div style={{
        position: "absolute",
        inset: 5,
        borderRadius: 8,
        border: "1px solid rgba(255,215,0,0.15)",
        pointerEvents: "none",
      }} />

      {/* Corner decorations */}
      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        fontSize: 8,
        color: "rgba(255,215,0,0.3)",
      }}>✦</div>
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        fontSize: 8,
        color: "rgba(255,215,0,0.3)",
      }}>✦</div>
      <div style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        fontSize: 8,
        color: "rgba(255,215,0,0.3)",
      }}>✦</div>
      <div style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        fontSize: 8,
        color: "rgba(255,215,0,0.3)",
      }}>✦</div>

      {/* Label (e.g. position in spread) */}
      {label && (
        <div style={{
          fontSize: 9,
          color: "rgba(255,215,0,0.6)",
          marginBottom: 2,
          letterSpacing: 2,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}>
          {label}
        </div>
      )}

      {/* Roman numeral */}
      {romanNumeral !== undefined && (
        <div style={{
          fontSize: small ? 12 : 14,
          color: "rgba(255,215,0,0.7)",
          letterSpacing: 3,
          fontFamily: "Georgia, serif",
          marginBottom: small ? 4 : 6,
          position: "relative",
          zIndex: 1,
        }}>
          {romanNumeral}
        </div>
      )}

      {/* Suit symbol or major arcana symbol */}
      <div style={{
        fontSize: small ? 22 : 30,
        marginBottom: small ? 4 : 8,
        position: "relative",
        zIndex: 1,
        color: "rgba(255,215,0,0.6)",
        lineHeight: 1,
      }}>
        {suitSymbol ?? '☆'}
      </div>

      {/* Card name (EN) */}
      <div style={{
        fontSize: small ? 10 : 13,
        fontWeight: 600,
        color: "#fff",
        lineHeight: 1.3,
        position: "relative",
        zIndex: 1,
        fontFamily: "Georgia, serif",
      }}>
        {card.name.en}
      </div>

      {/* Card name (ZH) */}
      <div style={{
        fontSize: small ? 9 : 11,
        color: "rgba(255,215,0,0.65)",
        marginTop: 2,
        position: "relative",
        zIndex: 1,
      }}>
        {card.name.zh}
      </div>

      {/* Keywords (only on non-small cards) */}
      {!small && (
        <div style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.4)",
          marginTop: 8,
          lineHeight: 1.4,
          position: "relative",
          zIndex: 1,
          maxWidth: "90%",
        }}>
          {card.keywords.en.slice(0, 3).join(" · ")}
        </div>
      )}
    </div>
  );
}
