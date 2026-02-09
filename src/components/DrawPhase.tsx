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
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screenW = useWindowWidth();
  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;

  // Responsive params
  const params = useMemo(() => {
    if (screenW < 480)  return { cardW: 34, cardH: 52, radius: 160, maxArc: 70, tilt: 18 };
    if (screenW < 768)  return { cardW: 44, cardH: 66, radius: 220, maxArc: 90, tilt: 16 };
    return                      { cardW: 56, cardH: 84, radius: 300, maxArc: 120, tilt: 14 };
  }, [screenW]);

  const arcAngle = Math.min(totalCards * 1.5, params.maxArc);
  const halfArc = arcAngle / 2;

  // Entry animation: start collapsed, then fan out
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Build card style: rotation-only fan (no sin/cos needed)
  // transform-origin is set far below card in CSS, so rotate() naturally fans them
  const getCardStyle = useCallback((index: number, isActive: boolean) => {
    const angle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    if (!entered) {
      return {
        transform: `rotate(0deg) translateY(0px)`,
        opacity: 0,
      };
    }

    const liftY = isActive ? -40 : 0;
    const liftZ = isActive ? 50 : 0;
    const scale = isActive ? 1.18 : 1;

    return {
      transform: `rotate(${angle}deg) translateY(${liftY}px) translateZ(${liftZ}px) scale(${scale})`,
      opacity: 1,
    };
  }, [totalCards, halfArc, arcAngle, entered]);

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

      {/* 3D scene */}
      <div className="fan-scene">
        <div
          className="fan-table"
          style={{ transform: `rotateX(${params.tilt}deg)` }}
        >
          <div
            className="fan-pivot"
            style={{
              // Set the arc radius via CSS custom property
              '--fan-radius': `${params.radius}px`,
            } as React.CSSProperties}
          >
            {deck.map((card, i) => {
              const isActive = hoveredIndex === i || pressedIndex === i;
              const { transform, opacity } = getCardStyle(i, isActive);
              return (
                <div
                  key={card.id}
                  className={`fan-card ${isActive ? 'fan-card--active' : ''}`}
                  style={{
                    '--card-w': `${params.cardW}px`,
                    width: params.cardW,
                    height: params.cardH,
                    transform,
                    opacity,
                    zIndex: isActive ? 200 : i,
                    transitionDelay: entered ? '0s' : `${i * 0.012}s`,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => handleTouchStart(i)}
                  onTouchEnd={() => handleTouchEnd(i)}
                  onTouchCancel={handleTouchCancel}
                >
                  <CardBack
                    onClick={canDraw ? () => onDrawCard(i) : undefined}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 6,
                      fontSize: params.cardW < 40 ? 10 : 14,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
