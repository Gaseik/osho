"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import CardFace from "./CardFace";
import { type Card } from "../data/cards";

interface StaticCardProps {
  card: Card;
  label: string;
}

export default function StaticCard({ card, label }: StaticCardProps) {
  const { t } = useTranslation();
  const [zoomed, setZoomed] = useState(false);
  const cardName = t(`cards.${card.id}`);

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="text-[11px] text-zen-gold-dim tracking-widest">
          {label}
        </div>
        <div className="cursor-pointer" onClick={() => setZoomed(true)}>
          <CardFace card={card} label={label} />
        </div>
        <div className="text-xs text-white/70 mt-1">{cardName}</div>
      </div>

      {zoomed &&
        createPortal(
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
