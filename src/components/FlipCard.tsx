import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Card } from "../data/cards";
import CardBack from "./CardBack";
import CardFace from "./CardFace";

interface FlipCardProps {
  card: Card;
  label?: string;
  delay: number;
  onFlipped?: () => void;
}

export default function FlipCard({ card, label, delay, onFlipped }: FlipCardProps) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const [ready, setReady] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const cardName = t(`cards.${card.id}`);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const handleClick = () => {
    if (!flipped && ready) {
      setFlipped(true);
      setTimeout(() => onFlipped?.(), 600);
    } else if (flipped) {
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
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden"
          }}>
            <CardBack
              style={{ width: "100%", height: "100%" }}
              ready={ready && !flipped}
            />
          </div>
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}>
            <CardFace card={card} label={label} />
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
              <CardFace card={card} label={label} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
