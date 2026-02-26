"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { useTranslation } from "react-i18next";
import { TarotCard, shuffleTarotDeck } from "../../../data/tarot-cards";
import { getTarotSpread } from "../../../data/tarot-spreads";
import TarotQuestionInput from "../../../components/TarotQuestionInput";
import TarotDrawPhase, { DrawnTarotCard } from "../../../components/TarotDrawPhase";
import TarotResultPhase from "../../../components/TarotResultPhase";
import SideMenu from "../../../components/SideMenu";

type Phase = "question" | "draw" | "result";

export default function TarotSpreadPage() {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith("zh");
  const params = useParams();
  const router = useRouter();
  const spreadId = params.spreadId as string;
  const spread = getTarotSpread(spreadId);

  const [phase, setPhase] = useState<Phase>("question");
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [drawn, setDrawn] = useState<DrawnTarotCard[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");
  const [usedCardIds, setUsedCardIds] = useState<Set<number>>(new Set());

  // Initialize deck on mount
  useEffect(() => {
    setDeck(shuffleTarotDeck());
  }, []);

  // Redirect if spread not found
  useEffect(() => {
    if (!spread) {
      router.replace("/tarot");
    }
  }, [spread, router]);

  if (!spread) return null;

  const handleQuestionSubmit = (q: string) => {
    setUserQuestion(q);
    setPhase("draw");
    sendGAEvent("event", "tarot_question_submit", { spread_type: spread.id });
  };

  const drawCard = (idx: number) => {
    if (drawn.length >= spread.count) return;
    const card = deck[idx];
    const isReversed = Math.random() < 0.5;
    setDrawn((p) => [...p, { card, isReversed }]);
    setDeck((p) => p.filter((_, i) => i !== idx));
    setUsedCardIds((prev) => new Set(prev).add(card.id));
    sendGAEvent("event", "draw_tarot_card", { spread_type: spread.id, card_name: card.name.en, is_reversed: isReversed });
  };

  const onDrawComplete = () => {
    setPhase("result");
    sendGAEvent("event", "all_cards_drawn", { spread_type: `tarot_${spread.id}` });
  };

  const reset = () => {
    router.push("/tarot");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark text-white font-serif flex flex-col items-center px-4 py-10">
      <SideMenu />

      {/* Header */}
      <div className={`text-center animate-fadeUp ${phase === "result" ? "mb-4" : "mb-10"}`}>
        <div className="text-sm tracking-[0.375rem] text-purple-300/60 mb-2">
          🃏 CLASSIC TAROT 🃏
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {phase === "result"
            ? (isZh ? "解讀" : "Reading")
            : (isZh ? spread.name : spread.nameEn)}
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto mt-3" />
      </div>

      {phase === "question" && (
        <TarotQuestionInput onSubmit={handleQuestionSubmit} />
      )}

      {phase === "draw" && (
        <TarotDrawPhase
          spread={spread}
          deck={deck}
          drawn={drawn}
          onDrawCard={drawCard}
          onComplete={onDrawComplete}
        />
      )}

      {phase === "result" && (
        <TarotResultPhase
          spread={spread}
          drawn={drawn}
          userQuestion={userQuestion}
          flippedCount={flippedCount}
          onFlipped={() => setFlippedCount((p) => p + 1)}
          onReset={reset}
          usedCardIds={usedCardIds}
        />
      )}
    </div>
  );
}
