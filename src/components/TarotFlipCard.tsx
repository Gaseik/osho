"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TarotCard } from "../data/tarot-cards";
import CardBack from "./CardBack";
import TarotCardFace from "./TarotCardFace";

interface TarotFlipCardProps {
  card: TarotCard;
  isReversed: boolean;
  label?: string;
  delay: number;
  revealed?: boolean;
  onFlipped?: () => void;
  onRequestReveal?: () => void;
  locale?: string;
}

export default function TarotFlipCard({
  card,
  isReversed,
  label,
  delay,
  revealed,
  onFlipped,
  onRequestReveal,
  locale = "zh-TW",
}: TarotFlipCardProps) {
  const isZh = locale.startsWith("zh");
  const [flipped, setFlipped] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const hasStartedFlip = useRef(false);
  const onFlippedRef = useRef(onFlipped);
  onFlippedRef.current = onFlipped;
  const cardName = isZh ? card.name.zh : card.name.en;

  useEffect(() => {
    if (revealed && !hasStartedFlip.current) {
      hasStartedFlip.current = true;
      const timer = setTimeout(() => {
        setFlipped(true);
        setTimeout(() => onFlippedRef.current?.(), 600);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [revealed, delay]);

  const handleClick = () => {
    if (!flipped) {
      onRequestReveal?.();
    } else {
      setZoomed(true);
    }
  };

  return (
    <>
      <div style={{ perspective: 800, width: 140, height: 210 }}>
        <div
          onClick={handleClick}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            cursor: "pointer",
          }}
        >
          {/* Back */}
          <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden" }}>
            <CardBack style={{ width: "100%", height: "100%" }} ready={!flipped} />
          </div>
          {/* Front */}
          <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <TarotCardFace card={card} isReversed={isReversed} label={label} locale={locale} />
          </div>
        </div>
      </div>

      {/* Upright/Reversed badge */}
      {flipped && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            letterSpacing: 1,
            fontWeight: 600,
            color: isReversed ? "rgba(200, 130, 255, 0.9)" : "rgba(180, 220, 130, 0.9)",
            textAlign: "center",
          }}
        >
          {isReversed
            ? (isZh ? "逆位 ▼" : "Reversed ▼")
            : (isZh ? "正位 ▲" : "Upright ▲")}
        </div>
      )}

      {/* Zoom overlay */}
      {zoomed &&
        createPortal(
          <div className="card-zoom-overlay" onClick={() => setZoomed(false)}>
            <div className="card-zoom-content">
              <div className="card-zoom-name">{cardName}</div>
              <div
                style={{
                  fontSize: 13,
                  color: isReversed ? "rgba(200, 130, 255, 0.9)" : "rgba(180, 220, 130, 0.9)",
                  marginBottom: 8,
                  letterSpacing: 2,
                }}
              >
                {isReversed ? (isZh ? "逆位 ▼" : "Reversed ▼") : (isZh ? "正位 ▲" : "Upright ▲")}
              </div>
              <div className="card-zoom-card">
                <TarotCardFace card={card} isReversed={isReversed} locale={locale} />
              </div>
              <div
                style={{
                  maxWidth: 320,
                  marginTop: 16,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                {isReversed
                  ? (isZh ? card.reversed.zh : card.reversed.en)
                  : (isZh ? card.upright.zh : card.upright.en)}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
