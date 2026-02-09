import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread } from "../data/spreads";
import CardBack from "./CardBack";

interface DrawPhaseProps {
  spread: Spread;
  deck: Card[];
  drawn: Card[];
  onDrawCard: (index: number) => void;
}

export default function DrawPhase({ spread, deck, drawn, onDrawCard }: DrawPhaseProps) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;

  // Arc geometry
  const arcAngle = Math.min(totalCards * 1.8, 120); // total arc spread in degrees
  const halfArc = arcAngle / 2;
  const radius = 500; // arc radius in px

  const getCardTransform = useCallback((index: number, isActive: boolean) => {
    // Distribute cards evenly along the arc
    const angle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    const rad = (angle * Math.PI) / 180;
    const x = Math.sin(rad) * radius;
    const y = (1 - Math.cos(rad)) * radius * 0.15; // flatten the arc vertically

    const floatY = isActive ? -30 : 0;
    const scaleVal = isActive ? 1.15 : 1;

    return {
      transform: `translate(${x}px, ${y + floatY}px) rotate(${angle}deg) scale(${scaleVal})`,
      zIndex: isActive ? 100 : index,
    };
  }, [totalCards, halfArc, arcAngle, radius]);

  // Long press for mobile
  const handleTouchStart = useCallback((index: number) => {
    pressTimerRef.current = setTimeout(() => {
      setPressedIndex(index);
    }, 300);
  }, []);

  const handleTouchEnd = useCallback((index: number) => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    // If the card was in pressed (floating) state, treat release as a draw
    if (pressedIndex === index && canDraw) {
      onDrawCard(index);
    }
    setPressedIndex(null);
  }, [pressedIndex, canDraw, onDrawCard]);

  const handleTouchCancel = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setPressedIndex(null);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    };
  }, []);

  return (
    <div className="animate-fadeUp text-center w-full">
      <p className="text-white/60 text-sm mb-2">
        {t(`spread.${spread.id}`)} — {t('draw.title', { count: spread.count })}
      </p>
      <p className="text-zen-gold/50 text-[13px] mb-6">
        {t('draw.selected', { current: drawn.length, total: spread.count })}
      </p>

      {/* Arc container */}
      <div
        ref={containerRef}
        className="fan-container"
      >
        <div className="fan-inner">
          {deck.map((card, i) => {
            const isActive = hoveredIndex === i || pressedIndex === i;
            const { transform, zIndex } = getCardTransform(i, isActive);
            return (
              <div
                key={card.id}
                className="fan-card"
                style={{
                  transform,
                  zIndex,
                  animation: `fanIn 0.5s ease-out ${i * 0.015}s both`,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => handleTouchStart(i)}
                onTouchEnd={() => handleTouchEnd(i)}
                onTouchCancel={handleTouchCancel}
              >
                <CardBack
                  onClick={canDraw ? () => onDrawCard(i) : undefined}
                  style={{ width: 56, height: 84, borderRadius: 6, fontSize: 14 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
