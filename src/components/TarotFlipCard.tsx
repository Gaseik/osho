"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { TarotCard } from "../data/tarot-cards";
import CardBack from "./CardBack";
import TarotCardFace from "./TarotCardFace";

interface TarotFlipCardProps {
  card: TarotCard;
  label?: string;
  delay: number;
  revealed?: boolean;
  reversed?: boolean;
  onFlipped?: () => void;
}

export default function TarotFlipCard({
  card,
  label,
  delay,
  revealed,
  reversed,
  onFlipped,
}: TarotFlipCardProps) {
  const { i18n } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const hasStartedFlip = useRef(false);
  const onFlippedRef = useRef(onFlipped);
  onFlippedRef.current = onFlipped;
  const lang = i18n.language === "zh-TW" ? "zh" : "en";

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

  return (
    <>
      <div style={{ perspective: 800, width: 140, height: 210 }}>
        <div
          onClick={() => flipped && setZoomed(true)}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            cursor: flipped ? "pointer" : "default",
          }}
        >
          {/* Back */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
            }}
          >
            <CardBack style={{ width: "100%", height: "100%" }} ready={!flipped} />
          </div>
          {/* Front */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <TarotCardFace card={card} label={label} reversed={reversed} />
          </div>
        </div>
      </div>

      {zoomed &&
        createPortal(
          <div className="card-zoom-overlay" onClick={() => setZoomed(false)}>
            <div className="card-zoom-content">
              <div className="card-zoom-name">{card.name[lang]}</div>
              <TarotCardFace card={card} reversed={reversed} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
