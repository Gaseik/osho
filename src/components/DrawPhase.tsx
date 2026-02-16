"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS } from "../data/spreads";

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
  const rafRef = useRef<number>(0);

  const screenW = useWindowWidth();
  const totalCards = deck.length;
  const canDraw = drawn.length < spread.count;
  const isMobile = screenW < 768;

  // Responsive params
  const params = useMemo(() => {
    if (screenW < 480)  return { cardW: 128, cardH: 192, radius: 280, maxArc: 65, tilt: 22, liftY: 70, sens: 18 };
    if (screenW < 768)  return { cardW: 160, cardH: 240, radius: 380, maxArc: 80, tilt: 18, liftY: 80, sens: 22 };
    return                      { cardW: 112, cardH: 168, radius: 520, maxArc: 100, tilt: 14, liftY: 90, sens: 28 };
  }, [screenW]);

  const arcAngle = Math.min(totalCards * 1.4, params.maxArc);
  const halfArc = arcAngle / 2;

  const selectedAngle = useMemo(() => {
    if (totalCards <= 1) return 0;
    return -halfArc + (selectedIndex / (totalCards - 1)) * arcAngle;
  }, [selectedIndex, totalCards, halfArc, arcAngle]);

  // ─── Shuffle flow (shorter on mobile) ───
  const handleShuffle = useCallback(() => {
    setStage('shuffling');
    setTimeout(() => setStage('stacked'), isMobile ? 800 : 1200);
  }, [isMobile]);

  useEffect(() => {
    if (stage === 'stacked') {
      const timer = setTimeout(() => setStage('fanned'), isMobile ? 500 : 800);
      return () => clearTimeout(timer);
    }
  }, [stage, isMobile]);

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

  // Redirect if already complete on mount
  useEffect(() => {
    if (drawn.length >= spread.count) {
      onComplete?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exit animation when last card drawn
  useEffect(() => {
    if (drawn.length >= spread.count && stage === 'fanned') {
      setStage('exiting');
      const timer = setTimeout(() => onComplete?.(), 800);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawn.length, spread.count]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ─── Pointer drag (RAF-throttled) ───
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (stage !== 'fanned') return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startIndex: selectedIndex, moved: false };
    setIsDragging(true);
  }, [stage, selectedIndex]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || stage !== 'fanned') return;
    const clientX = e.clientX;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!dragRef.current) return;
      const deltaX = dragRef.current.startX - clientX;
      if (Math.abs(deltaX) > 5) {
        dragRef.current.moved = true;
        setHasEverDragged(true);
      }
      const newIndex = Math.max(0, Math.min(totalCards - 1,
        dragRef.current.startIndex + Math.round(deltaX / params.sens)
      ));
      setSelectedIndex(newIndex);
    });
  }, [stage, totalCards, params.sens]);

  const handlePointerUp = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const wasDrag = dragRef.current?.moved ?? false;
    dragRef.current = null;
    setIsDragging(false);

    if (!wasDrag && canDraw && stage === 'fanned') {
      onDrawCard(selectedIndex);
    }
  }, [canDraw, stage, selectedIndex, onDrawCard]);

  // ─── Shuffle card subset ───
  // Shuffle animation only needs a handful of cards — they overlap anyway.
  const shuffleVisibleSet = useMemo(() => {
    let maxCards: number;
    if (screenW < 480) maxCards = 8;
    else if (screenW < 768) maxCards = 14;
    else return null;
    if (totalCards <= maxCards) return null;
    const step = totalCards / maxCards;
    return new Set(Array.from({ length: maxCards }, (_, i) => Math.floor(i * step)));
  }, [screenW, totalCards]);

  // ─── Pre-computed static styles for fanned cards ───
  const baseFannedStyles = useMemo(() => {
    if (stage !== 'fanned') return null;
    return Array.from({ length: totalCards }, (_, i) => {
      const baseAngle = totalCards <= 1 ? 0 : -halfArc + (i / (totalCards - 1)) * arcAngle;
      return {
        transform: `rotate(${baseAngle}deg) translate3d(0, 0, 0) scale(1)`,
        opacity: 1 as number,
      };
    });
  }, [stage, totalCards, halfArc, arcAngle]);

  // ─── Card transform (GPU-optimized) ───
  const getCardStyle = useCallback((index: number): { transform: string; opacity: number } => {
    const baseAngle = totalCards <= 1
      ? 0
      : -halfArc + (index / (totalCards - 1)) * arcAngle;

    if (stage === 'idle') {
      return { transform: 'translate3d(0, 0, 0) scale(0.8)', opacity: 0 };
    }

    if (stage === 'shuffling') {
      const seed = ((index * 7 + 13) % 37) / 37;
      const sx = (seed - 0.5) * 120;
      const sy = (((index * 11 + 3) % 29) / 29 - 0.5) * 80;
      const sr = (seed - 0.5) * 40;
      return {
        transform: `translate3d(${sx}px, ${sy}px, 0) rotate(${sr}deg) scale(0.9)`,
        opacity: 1,
      };
    }

    if (stage === 'stacked') {
      const off = (index - totalCards / 2) * 0.3;
      const rot = (index - totalCards / 2) * 0.15;
      return {
        transform: `translate3d(${off}px, 0, 0) rotate(${rot}deg) scale(1)`,
        opacity: 1,
      };
    }

    if (stage === 'exiting') {
      const off = (index - totalCards / 2) * 0.15;
      return {
        transform: `translate3d(${off}px, 60px, 0) scale(0.6)`,
        opacity: 0,
      };
    }

    // ─── FANNED ───
    if (index === selectedIndex) {
      return {
        transform: `rotate(${selectedAngle}deg) translate3d(0, ${-params.liftY}px, 60px) scale(1.15)`,
        opacity: 1,
      };
    }

    return baseFannedStyles![index];
  }, [totalCards, halfArc, arcAngle, stage, selectedAngle, selectedIndex, params.liftY, baseFannedStyles]);

  // Transition timing
  const getTransitionDelay = useCallback((index: number) => {
    if (isDragging) return '0s';
    const m = isMobile ? 0.5 : 1;
    if (stage === 'shuffling') return `${(index % 8) * 0.025 * m}s`;
    if (stage === 'stacked') return `${index * 0.004 * m}s`;
    if (stage === 'exiting') return `${index * 0.003 * m}s`;
    if (stage === 'fanned') return `${index * 0.008 * m}s`;
    return '0s';
  }, [stage, isDragging, isMobile]);

  const transitionDuration = useMemo(() => {
    if (isDragging) return '0.15s';
    if (stage === 'shuffling') return isMobile ? '0.35s' : '0.5s';
    if (stage === 'stacked') return isMobile ? '0.3s' : '0.4s';
    if (stage === 'exiting') return isMobile ? '0.4s' : '0.6s';
    if (stage === 'fanned') return isMobile ? '0.4s' : '0.6s';
    return '0.3s';
  }, [stage, isDragging, isMobile]);

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

      {/* Drawn cards stack */}
      {drawn.length > 0 && stage !== 'idle' && (
        <div className="flex justify-center mt-4">
          <div className="flex">
            {drawn.map((card, i) => {
              const posLabel = i18n.language === 'zh-TW'
                ? POSITION_LABELS[spread.id]?.[i]
                : t(`spread.${spread.id}Labels.${i}`);
              return (
                <div
                  key={card.id}
                  className="drawn-stack-card"
                  style={{
                    width: 60,
                    height: 90,
                    marginLeft: i > 0 ? -35 : 0,
                    position: 'relative',
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,215,0,0.2)',
                    zIndex: i,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  <img
                    src="/assets/cardback.jpeg"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgba(255,215,0,0.85)',
                        fontSize: 9,
                        letterSpacing: 1,
                        textAlign: 'center',
                        padding: '0 4px',
                      }}
                    >
                      {posLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Shuffle button */}
      {stage === 'idle' && (
        <div className="animate-fadeUp flex flex-col items-center mt-16">
          <button onClick={handleShuffle} className="shuffle-btn">
            <span className="shuffle-btn-icon">☯︎</span>
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
              style={{
                '--fan-radius': `${params.radius}px`,
                transform: stage === 'fanned' ? `rotate(${-selectedAngle}deg)` : undefined,
                transitionDuration: isDragging ? '0.15s' : undefined,
              } as React.CSSProperties}
            >
              {deck.map((card, i) => {
                const isCulled = shuffleVisibleSet && !shuffleVisibleSet.has(i);
                // Hidden cards stay in DOM but are invisible + no transition cost
                const isHidden = isCulled && (stage === 'shuffling' || stage === 'stacked');
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
                      opacity: isHidden ? 0 : opacity,
                      visibility: isHidden ? 'hidden' : undefined,
                      zIndex: isSelected ? 200 : i,
                      // transition:none while hidden → zero GPU cost; when unhidden,
                      // CSS .fan-card transition kicks in and animates stacked→fanned
                      transition: isHidden ? 'none' : undefined,
                      transitionDelay: isHidden ? undefined : getTransitionDelay(i),
                      transitionDuration: isHidden ? undefined : transitionDuration,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Drag hint */}
      {stage === 'fanned' && !hasEverDragged && (
        <div className="fan-hint">
          {t('draw.dragHint')}
        </div>
      )}
    </>
  );
}
