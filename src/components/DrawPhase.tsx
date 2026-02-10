"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS } from "../data/spreads";
import CardBack from "./CardBack";

interface DrawPhaseProps {
  spread: Spread;
  deck: Card[];
  drawn: Card[];
  onDrawCard: (index: number) => void;
  onComplete?: () => void;
}

type Stage = 'idle' | 'shuffling' | 'stacked' | 'fanned' | 'exiting';

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

export default function DrawPhase({ spread, deck, drawn, onDrawCard, onComplete }: DrawPhaseProps) {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState<Stage>('idle');
  const [selectedIndex, setSelectedIndex] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [hasEverDragged, setHasEverDragged] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startIndex: number; moved: boolean } | null>(null);

  const screenW = useWindowWidth();
  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;

  // Responsive params — cards doubled
  const params = useMemo(() => {
    if (screenW < 480)  return { cardW: 128, cardH: 192, radius: 280, maxArc: 65, tilt: 22, liftY: 70, sens: 18 };
    if (screenW < 768)  return { cardW: 160, cardH: 240, radius: 380, maxArc: 80, tilt: 18, liftY: 80, sens: 22 };
    return                      { cardW: 112, cardH: 168, radius: 520, maxArc: 100, tilt: 14, liftY: 90, sens: 28 };
  }, [screenW]);

  const arcAngle = Math.min(totalCards * 1.4, params.maxArc);
  const halfArc = arcAngle / 2;

  // The angle of the selected card — used to center it
  const selectedAngle = useMemo(() => {
    if (totalCards <= 1) return 0;
    return -halfArc + (selectedIndex / (totalCards - 1)) * arcAngle;
  }, [selectedIndex, totalCards, halfArc, arcAngle]);

  // ─── Shuffle flow ───
  const handleShuffle = useCallback(() => {
    setStage('shuffling');
    setTimeout(() => setStage('stacked'), 1200);
  }, []);

  useEffect(() => {
    if (stage === 'stacked') {
      const timer = setTimeout(() => setStage('fanned'), 800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Center selection when entering fanned stage
  useEffect(() => {
    if (stage === 'fanned') {
      setSelectedIndex(Math.floor(deck.length / 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Clamp if deck shrinks
  useEffect(() => {
    if (deck.length > 0 && selectedIndex >= deck.length) {
      setSelectedIndex(deck.length - 1);
    }
  }, [deck.length, selectedIndex]);

  // Redirect if already complete on mount (e.g. browser back button)
  useEffect(() => {
    if (drawn.length >= spread.count) {
      onComplete?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exit animation when last card drawn during this session
  useEffect(() => {
    if (drawn.length >= spread.count && stage === 'fanned') {
      setStage('exiting');
      const timer = setTimeout(() => onComplete?.(), 800);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawn.length, spread.count]);

  // ─── Pointer drag ───
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (stage !== 'fanned') return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startIndex: selectedIndex, moved: false };
    setIsDragging(true);
  }, [stage, selectedIndex]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || stage !== 'fanned') return;
    const deltaX = dragRef.current.startX - e.clientX;
    if (Math.abs(deltaX) > 5) {
      dragRef.current.moved = true;
      setHasEverDragged(true);
    }
    const newIndex = Math.max(0, Math.min(totalCards - 1,
      dragRef.current.startIndex + Math.round(deltaX / params.sens)
    ));
    setSelectedIndex(newIndex);
  }, [stage, totalCards, params.sens]);

  const handlePointerUp = useCallback(() => {
    const wasDrag = dragRef.current?.moved ?? false;
    dragRef.current = null;
    setIsDragging(false);

    // Tap (no drag) → draw the selected card
    if (!wasDrag && canDraw && stage === 'fanned') {
      onDrawCard(selectedIndex);
    }
  }, [canDraw, stage, selectedIndex, onDrawCard]);

  // ─── Card transform ───
  const getCardStyle = useCallback((index: number) => {
    const baseAngle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    // idle
    if (stage === 'idle') {
      return { transform: 'rotate(0deg) translateY(0px) scale(0.8)', opacity: 0 };
    }

    // shuffling — scatter
    if (stage === 'shuffling') {
      const seed = ((index * 7 + 13) % 37) / 37;
      const sx = (seed - 0.5) * 120;
      const sy = (((index * 11 + 3) % 29) / 29 - 0.5) * 80;
      const sr = (seed - 0.5) * 40;
      return {
        transform: `rotate(${sr}deg) translate(${sx}px, ${sy}px) scale(0.9)`,
        opacity: 1,
      };
    }

    // stacked — converge to center
    if (stage === 'stacked') {
      const off = (index - totalCards / 2) * 0.3;
      const rot = (index - totalCards / 2) * 0.15;
      return {
        transform: `rotate(${rot}deg) translate(${off}px, 0px) scale(1)`,
        opacity: 1,
      };
    }

    // exiting — collapse and fade
    if (stage === 'exiting') {
      const off = (index - totalCards / 2) * 0.15;
      return {
        transform: `rotate(0deg) translate(${off}px, 60px) scale(0.6)`,
        opacity: 0,
      };
    }

    // fanned — offset so selectedIndex card is at angle 0 (center)
    const angle = baseAngle - selectedAngle;
    const dist = Math.abs(index - selectedIndex);

    let liftY = 0;
    let liftZ = 0;
    let scale = 1;
    let unRotate = 1;

    if (dist === 0) {
      liftY = -params.liftY;
      liftZ = 60;
      scale = 1.15;
      unRotate = 0.2;
    }

    return {
      transform: `rotate(${angle * unRotate}deg) translateY(${liftY}px) translateZ(${liftZ}px) scale(${scale})`,
      opacity: 1,
    };
  }, [totalCards, halfArc, arcAngle, stage, selectedAngle, selectedIndex, params.liftY]);

  // Transition timing
  const getTransitionDelay = useCallback((index: number) => {
    if (isDragging) return '0s';
    if (stage === 'shuffling') return `${(index % 8) * 0.03}s`;
    if (stage === 'stacked') return `${index * 0.005}s`;
    if (stage === 'exiting') return `${index * 0.004}s`;
    if (stage === 'fanned') return `${index * 0.012}s`;
    return '0s';
  }, [stage, isDragging]);

  const transitionDuration = useMemo(() => {
    if (isDragging) return '0.25s';
    if (stage === 'shuffling') return '0.5s';
    if (stage === 'stacked') return '0.4s';
    if (stage === 'exiting') return '0.6s';
    if (stage === 'fanned') return '0.6s';
    return '0.3s';
  }, [stage, isDragging]);

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
        {drawn.length < spread.count && (
          <p className="text-zen-gold/80 text-sm mt-2 tracking-wider">
            {t('draw.nextPosition', {
              label: i18n.language === 'zh-TW'
                ? POSITION_LABELS[spread.id]?.[drawn.length]
                : t(`spread.${spread.id}Labels.${drawn.length}`)
            })}
          </p>
        )}
      </div>

      {/* Shuffle button */}
      {stage === 'idle' && (
        <div className="animate-fadeUp flex flex-col items-center mt-16">
          <button onClick={handleShuffle} className="shuffle-btn">
            <span className="shuffle-btn-icon">☯</span>
            <span>{t('draw.shuffle')}</span>
          </button>
          <p className="text-white/30 text-xs mt-4">{t('draw.shuffleHint')}</p>
        </div>
      )}

      {/* Fan scene */}
      {stage !== 'idle' && (
        <div
          ref={sceneRef}
          className={`fan-scene ${stage === 'shuffling' || stage === 'stacked' ? 'fan-scene--center' : ''} ${stage === 'exiting' ? 'fan-scene--exiting' : ''} ${isDragging ? 'fan-scene--dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="fan-table"
            style={{ transform: `rotateX(${stage === 'fanned' || stage === 'exiting' ? params.tilt : 0}deg)` }}
          >
            <div
              className="fan-pivot"
              style={{ '--fan-radius': `${params.radius}px` } as React.CSSProperties}
            >
              {deck.map((card, i) => {
                const isSelected = i === selectedIndex && stage === 'fanned';
                const { transform, opacity } = getCardStyle(i);
                return (
                  <div
                    key={card.id}
                    className={`fan-card ${isSelected ? 'fan-card--active' : ''}`}
                    style={{
                      '--card-w': `${params.cardW}px`,
                      width: params.cardW,
                      height: params.cardH,
                      transform,
                      opacity,
                      zIndex: isSelected ? 200 : i,
                      transitionDelay: getTransitionDelay(i),
                      transitionDuration,
                    } as React.CSSProperties}
                  >
                    <CardBack
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        fontSize: params.cardW < 50 ? 14 : 22,
                        cursor: isSelected && canDraw ? 'pointer' : 'grab',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Drag hint — fixed to viewport bottom, outside fan-scene */}
      {stage === 'fanned' && !hasEverDragged && (
        <div className="fan-hint">
          {t('draw.dragHint')}
        </div>
      )}
    </>
  );
}
