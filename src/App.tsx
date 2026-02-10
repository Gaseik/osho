import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Card, CARDS, shuffle } from "./data/cards";
import { Spread, SPREADS } from "./data/spreads";
import SpreadSelector from "./components/SpreadSelector";
import DrawPhase from "./components/DrawPhase";
import ResultPhase from "./components/ResultPhase";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { POSITION_LABELS } from "./data/spreads";

export default function App() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [spread, setSpread] = useState<Spread | null>(null);
  const [deck, setDeck] = useState<Card[]>([]);
  const [drawn, setDrawn] = useState<Card[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const initSpread = (s: Spread) => {
    setSpread(s);
    setDeck(shuffle(CARDS));
    setDrawn([]);
    setFlippedCount(0);
    setCopied(false);
  };

  const selectSpread = (s: Spread) => {
    initSpread(s);
    navigate(`/draw/${s.id}`);
  };

  const drawCard = (idx: number) => {
    if (!spread || drawn.length >= spread.count) return;
    const card = deck[idx];
    setDrawn(p => [...p, card]);
    setDeck(p => p.filter((_, i) => i !== idx));
  };

  const onDrawComplete = () => {
    if (spread) navigate(`/result/${spread.id}`);
  };

  const getSpreadLabels = (spreadId: string): string[] => {
    if (i18n.language === 'zh-TW') {
      return POSITION_LABELS[spreadId];
    }
    const labelKey = `spread.${spreadId}Labels`;
    return Array.from({ length: spread?.count || 0 }, (_, i) =>
      t(`${labelKey}.${i}`)
    );
  };

  const copyPrompt = () => {
    if (!spread) return;
    const labels = getSpreadLabels(spread.id);
    const lines = drawn.map((c, i) =>
      `${labels[i]}：${c.name}（${c.nameZh}）- ${c.meaning}`
    );
    const spreadName = i18n.language === 'zh-TW' ? spread.name : t(`spread.${spread.id}`);
    const cardsText = lines.join("\n");
    const prompt = t('result.promptTemplate', { spreadName, cards: cardsText });

    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setSpread(null);
    setDrawn([]);
    setFlippedCount(0);
    setCopied(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10">
      <LanguageSwitcher />

      {/* Header */}
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯ {t('common.subtitle')} ☯
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t('common.title')}
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3" />
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<SpreadSelector onSelectSpread={selectSpread} />} />

        <Route path="/draw/:spreadId" element={
          <DrawRoute
            spread={spread}
            deck={deck}
            drawn={drawn}
            onDrawCard={drawCard}
            onDrawComplete={onDrawComplete}
            onInitSpread={initSpread}
          />
        } />

        <Route path="/result/:spreadId" element={
          <ResultRoute
            spread={spread}
            drawn={drawn}
            flippedCount={flippedCount}
            copied={copied}
            onFlipped={() => setFlippedCount(p => p + 1)}
            onCopyPrompt={copyPrompt}
            onReset={reset}
          />
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

/* Resolves spreadId from URL, initializes state if needed (e.g. direct navigation) */
function DrawRoute({
  spread, deck, drawn, onDrawCard, onDrawComplete, onInitSpread,
}: {
  spread: Spread | null;
  deck: Card[];
  drawn: Card[];
  onDrawCard: (idx: number) => void;
  onDrawComplete: () => void;
  onInitSpread: (s: Spread) => void;
}) {
  const { spreadId } = useParams();
  const urlSpread = SPREADS.find(s => s.id === spreadId);

  useEffect(() => {
    if (urlSpread && (!spread || spread.id !== spreadId)) {
      onInitSpread(urlSpread);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spreadId]);

  if (!urlSpread) return <Navigate to="/" replace />;
  if (!spread || spread.id !== spreadId) return null;

  return (
    <DrawPhase
      spread={spread}
      deck={deck}
      drawn={drawn}
      onDrawCard={onDrawCard}
      onComplete={onDrawComplete}
    />
  );
}

function ResultRoute({
  spread, drawn, flippedCount, copied, onFlipped, onCopyPrompt, onReset,
}: {
  spread: Spread | null;
  drawn: Card[];
  flippedCount: number;
  copied: boolean;
  onFlipped: () => void;
  onCopyPrompt: () => void;
  onReset: () => void;
}) {
  const { spreadId } = useParams();
  const urlSpread = SPREADS.find(s => s.id === spreadId);

  if (!urlSpread) return <Navigate to="/" replace />;
  if (!spread || drawn.length === 0) return <Navigate to={`/draw/${spreadId}`} replace />;

  return (
    <ResultPhase
      spread={spread}
      drawn={drawn}
      flippedCount={flippedCount}
      copied={copied}
      onFlipped={onFlipped}
      onCopyPrompt={onCopyPrompt}
      onReset={onReset}
    />
  );
}
