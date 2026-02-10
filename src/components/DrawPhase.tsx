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

type Stage = 'idle' | 'shuffling' | 'stacked' | 'fanned';

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
  const [stage, setStage] = useState<Stage>('idle');
  const sceneRef = useRef<HTMLDivElement>(null);

  const screenW = useWindowWidth();
  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;

  // Responsive params — card sizes doubled from before
  const params = useMemo(() => {
    if (screenW < 480)  return { cardW: 64,  cardH: 96,  radius: 280, maxArc: 65, tilt: 22, liftY: 70 };
    if (screenW < 768)  return { cardW: 80,  cardH: 120, radius: 380, maxArc: 80, tilt: 18, liftY: 80 };
    return                      { cardW: 112, cardH: 168, radius: 520, maxArc: 100, tilt: 14, liftY: 90 };
  }, [screenW]);

  const arcAngle = Math.min(totalCards * 1.4, params.maxArc);
  const halfArc = arcAngle / 2;

  // Shuffle flow: idle → shuffling (animation) → stacked → fanned
  const handleShuffle = useCallback(() => {
    setStage('shuffling');
    // Shuffling animation plays for 1.2s, then stack
    setTimeout(() => setStage('stacked'), 1200);
  }, []);

  // After stacking, wait 0.8s then fan out
  useEffect(() => {
    if (stage === 'stacked') {
      const timer = setTimeout(() => setStage('fanned'), 800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Map pointer X to card index
  const posToIndex = useCallback((clientX: number) => {
    if (!sceneRef.current) return null;
    const rect = sceneRef.current.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    const pad = 0.08;
    const mapped = (relX - pad) / (1 - 2 * pad);
    if (mapped < -0.02 || mapped > 1.02) return null;
    const idx = Math.round(mapped * (totalCards - 1));
    return Math.max(0, Math.min(totalCards - 1, idx));
  }, [totalCards]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (stage !== 'fanned') return;
    setHoveredIndex(posToIndex(e.clientX));
  }, [posToIndex, stage]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Touch: slide to browse, lift to draw
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (stage !== 'fanned') return;
    setHoveredIndex(posToIndex(e.touches[0].clientX));
  }, [posToIndex, stage]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (stage !== 'fanned') return;
    setHoveredIndex(posToIndex(e.touches[0].clientX));
  }, [posToIndex, stage]);

  const handleTouchEnd = useCallback(() => {
    if (hoveredIndex !== null && canDraw) {
      onDrawCard(hoveredIndex);
    }
    setHoveredIndex(null);
  }, [hoveredIndex, canDraw, onDrawCard]);

  const handleCardClick = useCallback((index: number) => {
    if (stage !== 'fanned' || !canDraw) return;
    onDrawCard(index);
  }, [canDraw, onDrawCard, stage]);

  // Card style per stage
  const getCardStyle = useCallback((index: number) => {
    const angle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    // Stage: idle — nothing visible
    if (stage === 'idle') {
      return { transform: `rotate(0deg) translateY(0px) scale(0.8)`, opacity: 0 };
    }

    // Stage: shuffling — cards fly around randomly then converge
    if (stage === 'shuffling') {
      // Random offset for shuffle scatter
      const seed = ((index * 7 + 13) % 37) / 37; // deterministic pseudo-random 0..1
      const sx = (seed - 0.5) * 120;
      const sy = (((index * 11 + 3) % 29) / 29 - 0.5) * 80;
      const sr = (seed - 0.5) * 40;
      return {
        transform: `rotate(${sr}deg) translate(${sx}px, ${sy}px) scale(0.9)`,
        opacity: 1,
      };
    }

    // Stage: stacked — all cards at center, stacked with slight offsets
    if (stage === 'stacked') {
      const stackOffset = (index - totalCards / 2) * 0.3;
      const stackRotate = (index - totalCards / 2) * 0.15;
      return {
        transform: `rotate(${stackRotate}deg) translate(${stackOffset}px, 0px) scale(1)`,
        opacity: 1,
      };
    }

    // Stage: fanned — full arc with hover effects
    const dist = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : Infinity;
    let liftY = 0;
    let liftZ = 0;
    let scale = 1;
    let unRotateFactor = 1;

    if (dist === 0) {
      liftY = -params.liftY;
      liftZ = 60;
      scale = 1.22;
      unRotateFactor = 0.25;
    } else if (dist === 1) {
      liftY = -params.liftY * 0.35;
      liftZ = 20;
      scale = 1.06;
      unRotateFactor = 0.7;
    } else if (dist === 2) {
      liftY = -params.liftY * 0.12;
      liftZ = 6;
      scale = 1.01;
      unRotateFactor = 0.9;
    }

    const displayAngle = angle * unRotateFactor;
    return {
      transform: `rotate(${displayAngle}deg) translateY(${liftY}px) translateZ(${liftZ}px) scale(${scale})`,
      opacity: 1,
    };
  }, [totalCards, halfArc, arcAngle, stage, hoveredIndex, params.liftY]);

  // Transition speed per stage
  const getTransitionDelay = useCallback((index: number) => {
    if (stage === 'shuffling') return `${(index % 8) * 0.03}s`;
    if (stage === 'stacked') return `${index * 0.005}s`;
    if (stage === 'fanned') return `${index * 0.012}s`;
    return '0s';
  }, [stage]);

  const getTransitionDuration = useCallback(() => {
    if (stage === 'shuffling') return '0.5s';
    if (stage === 'stacked') return '0.4s';
    if (stage === 'fanned') return '0.38s';
    return '0.3s';
  }, [stage]);

  return (
    <>
      {/* Info text */}
      <div className="animate-fadeUp text-center w-full mb-4">
        <p className="text-white/60 text-sm mb-2">
          {t(`spread.${spread.id}`)} — {t('draw.title', { count: spread.count })}
        </p>
        <p className="text-zen-gold/50 text-[13px]">
          {t('draw.selected', { current: drawn.length, total: spread.count })}
        </p>
      </div>

      {/* Shuffle button — only in idle stage */}
      {stage === 'idle' && (
        <div className="animate-fadeUp flex flex-col items-center mt-16">
          <button
            onClick={handleShuffle}
            className="shuffle-btn"
          >
            <span className="shuffle-btn-icon">☯</span>
            <span>{t('draw.shuffle')}</span>
          </button>
          <p className="text-white/30 text-xs mt-4">{t('draw.shuffleHint')}</p>
        </div>
      )}

      {/* Fan scene — visible after shuffle starts */}
      {stage !== 'idle' && (
        <div
          ref={sceneRef}
          className={`fan-scene ${stage === 'shuffling' || stage === 'stacked' ? 'fan-scene--center' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => setHoveredIndex(null)}
        >
          <div className="fan-scene-bg" />

          <div
            className="fan-table"
            style={{ transform: `rotateX(${stage === 'fanned' ? params.tilt : 0}deg)` }}
          >
            <div
              className="fan-pivot"
              style={{ '--fan-radius': `${params.radius}px` } as React.CSSProperties}
            >
              {deck.map((card, i) => {
                const isActive = hoveredIndex === i && stage === 'fanned';
                const dist = hoveredIndex !== null ? Math.abs(i - hoveredIndex) : Infinity;
                const isNear = dist <= 2 && stage === 'fanned';
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
                      transitionDelay: stage === 'fanned' && hoveredIndex !== null ? '0s' : getTransitionDelay(i),
                      transitionDuration: getTransitionDuration(),
                    } as React.CSSProperties}
                    onClick={() => handleCardClick(i)}
                  >
                    <CardBack
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        fontSize: params.cardW < 50 ? 14 : 22,
                        cursor: canDraw && stage === 'fanned' ? 'pointer' : 'default',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
