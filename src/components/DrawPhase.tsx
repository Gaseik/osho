import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
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

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

export default function DrawPhase({ spread, deck, drawn, onDrawCard }: DrawPhaseProps) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  const screenW = useWindowWidth();
  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;

  // Responsive params
  const params = useMemo(() => {
    if (screenW < 480)  return { cardW: 36, cardH: 54, radius: 180, maxArc: 72, tilt: 20, liftY: 55 };
    if (screenW < 768)  return { cardW: 44, cardH: 66, radius: 240, maxArc: 88, tilt: 17, liftY: 60 };
    return                      { cardW: 56, cardH: 84, radius: 320, maxArc: 110, tilt: 14, liftY: 65 };
  }, [screenW]);

  const arcAngle = Math.min(totalCards * 1.5, params.maxArc);
  const halfArc = arcAngle / 2;

  // Entry animation
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Map pointer X to card index
  const posToIndex = useCallback((clientX: number) => {
    if (!sceneRef.current) return null;
    const rect = sceneRef.current.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width; // 0..1
    const pad = 0.1;
    const mapped = (relX - pad) / (1 - 2 * pad);
    if (mapped < -0.02 || mapped > 1.02) return null;
    const idx = Math.round(mapped * (totalCards - 1));
    return Math.max(0, Math.min(totalCards - 1, idx));
  }, [totalCards]);

  // Mouse tracking on the scene container
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setHoveredIndex(posToIndex(e.clientX));
  }, [posToIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Touch: slide to browse, lift to draw
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const idx = posToIndex(e.touches[0].clientX);
    setHoveredIndex(idx);
  }, [posToIndex]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const idx = posToIndex(e.touches[0].clientX);
    setHoveredIndex(idx);
  }, [posToIndex]);

  const handleTouchEnd = useCallback(() => {
    if (hoveredIndex !== null && canDraw) {
      onDrawCard(hoveredIndex);
    }
    setHoveredIndex(null);
  }, [hoveredIndex, canDraw, onDrawCard]);

  // Click on a card (desktop)
  const handleCardClick = useCallback((index: number) => {
    if (canDraw) onDrawCard(index);
  }, [canDraw, onDrawCard]);

  // Card style — with neighbor wave effect
  const getCardStyle = useCallback((index: number) => {
    const angle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    // Not entered yet: collapsed at center
    if (!entered) {
      return {
        transform: `rotate(0deg) translateY(20px)`,
        opacity: 0,
      };
    }

    // Distance from hovered card
    const dist = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : Infinity;

    let liftY = 0;
    let liftZ = 0;
    let scale = 1;
    let unRotateFactor = 1; // 1 = full rotation, 0 = no rotation

    if (dist === 0) {
      liftY = -params.liftY;
      liftZ = 50;
      scale = 1.22;
      unRotateFactor = 0.3;
    } else if (dist === 1) {
      liftY = -params.liftY * 0.35;
      liftZ = 18;
      scale = 1.06;
      unRotateFactor = 0.75;
    } else if (dist === 2) {
      liftY = -params.liftY * 0.12;
      liftZ = 5;
      scale = 1.01;
      unRotateFactor = 0.92;
    }

    const displayAngle = angle * unRotateFactor;

    return {
      transform: `rotate(${displayAngle}deg) translateY(${liftY}px) translateZ(${liftZ}px) scale(${scale})`,
      opacity: 1,
    };
  }, [totalCards, halfArc, arcAngle, entered, hoveredIndex, params.liftY]);

  return (
    <>
      {/* Info text — normal flow */}
      <div className="animate-fadeUp text-center w-full mb-4">
        <p className="text-white/60 text-sm mb-2">
          {t(`spread.${spread.id}`)} — {t('draw.title', { count: spread.count })}
        </p>
        <p className="text-zen-gold/50 text-[13px]">
          {t('draw.selected', { current: drawn.length, total: spread.count })}
        </p>
      </div>

      {/* Fixed fan at viewport bottom */}
      <div
        ref={sceneRef}
        className="fan-scene"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setHoveredIndex(null)}
      >
        {/* Gradient fade from page bg */}
        <div className="fan-scene-bg" />

        <div
          className="fan-table"
          style={{ transform: `rotateX(${params.tilt}deg)` }}
        >
          <div
            className="fan-pivot"
            style={{ '--fan-radius': `${params.radius}px` } as React.CSSProperties}
          >
            {deck.map((card, i) => {
              const isActive = hoveredIndex === i;
              const dist = hoveredIndex !== null ? Math.abs(i - hoveredIndex) : Infinity;
              const isNear = dist <= 2;
              const { transform, opacity } = getCardStyle(i);
              return (
                <div
                  key={card.id}
                  className={`fan-card ${isActive ? 'fan-card--active' : ''} ${isNear && !isActive ? 'fan-card--near' : ''}`}
                  style={{
                    '--card-w': `${params.cardW}px`,
                    width: params.cardW,
                    height: params.cardH,
                    transform,
                    opacity,
                    zIndex: isActive ? 200 : isNear ? 100 + (3 - dist) : i,
                    transitionDelay: entered ? '0s' : `${i * 0.012}s`,
                  } as React.CSSProperties}
                  onClick={() => handleCardClick(i)}
                >
                  <CardBack
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 6,
                      fontSize: params.cardW < 40 ? 10 : 14,
                      cursor: canDraw ? 'pointer' : 'default',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
