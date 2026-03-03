"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Card } from "../data/cards";
import CardBack from "./CardBack";
import CardFace from "./CardFace";

interface FlipCardProps {
  card: Card;
  label?: string;
  delay: number;
  revealed?: boolean;
  onFlipped?: () => void;
  onRequestReveal?: () => void;
  /** If true, render the card face upside-down (tarot reversed) */
  reversed?: boolean;
  /** Custom face element — overrides default CardFace (for tarot cards etc.) */
  customFace?: React.ReactNode;
  /** Custom name for zoom overlay — overrides i18n lookup */
  customName?: string;
  /** Custom card back image path */
  cardBackSrc?: string;
  /** Smaller card size (100×150) */
  small?: boolean;
}

export default function FlipCard({ card, label, delay, revealed, onFlipped, onRequestReveal, reversed, customFace, customName, cardBackSrc, small }: FlipCardProps) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const hasStartedFlip = useRef(false);
  const onFlippedRef = useRef(onFlipped);
  onFlippedRef.current = onFlipped;
  const cardName = customName ?? t(`cards.${card.id}`);

  // When revealed becomes true, flip after stagger delay
  // Use ref for onFlipped to avoid cleanup race condition
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

  const w = small ? 100 : 140;
  const h = small ? 150 : 210;

  return (
    <>
      <div style={{ perspective: 800, width: w, height: h }}>
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
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden"
          }}>
            <CardBack
              style={{ width: "100%", height: "100%" }}
              ready={!flipped}
              src={cardBackSrc}
            />
          </div>
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}>
            {customFace ?? <CardFace card={card} label={label} />}
          </div>
        </div>
      </div>

      {zoomed && createPortal(
        <div
          className="card-zoom-overlay"
          onClick={() => setZoomed(false)}
        >
          <div className="card-zoom-content">
            <div className="card-zoom-name">{cardName}</div>
            <div className="card-zoom-card">
              {customFace ?? <CardFace card={card} label={label} />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
