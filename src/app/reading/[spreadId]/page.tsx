"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { useTranslation } from "react-i18next";
import { Card, CARDS, shuffle } from "../../../data/cards";
import { SPREADS, POSITION_LABELS } from "../../../data/spreads";
import DrawPhase from "../../../components/DrawPhase";
import ResultPhase from "../../../components/ResultPhase";
import SideMenu from "../../../components/SideMenu";

type Phase = "draw" | "result";

export default function ReadingSpreadPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const spreadId = params.spreadId as string;
  const topic = searchParams.get("topic") || "";
  const description = searchParams.get("desc") || "";
  const spread = SPREADS.find((s) => s.id === spreadId);

  const [phase, setPhase] = useState<Phase>("draw");
  const [deck, setDeck] = useState<Card[]>([]);
  const [drawn, setDrawn] = useState<Card[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Initialize deck on mount
  useEffect(() => {
    setDeck(shuffle(CARDS));
  }, []);

  // Redirect if spread not found
  useEffect(() => {
    if (!spread) {
      router.replace("/reading");
    }
  }, [spread, router]);

  if (!spread) return null;

  const drawCard = (idx: number) => {
    if (drawn.length >= spread.count) return;
    const card = deck[idx];
    setDrawn((p) => [...p, card]);
    setDeck((p) => p.filter((_, i) => i !== idx));
    sendGAEvent("event", "draw_card", { spread_type: spread.id });
  };

  const onDrawComplete = () => {
    setPhase("result");
  };

  const getSpreadLabels = (sid: string): string[] => {
    if (i18n.language === "zh-TW") {
      return POSITION_LABELS[sid];
    }
    const labelKey = `spread.${sid}Labels`;
    return Array.from({ length: spread.count }, (_, i) =>
      t(`${labelKey}.${i}`)
    );
  };

  const copyPrompt = () => {
    const labels = getSpreadLabels(spread.id);
    const lines = drawn.map(
      (c, i) => `${labels[i]}：${c.name}（${c.nameZh}）- ${c.keywords.join(", ")}`
    );
    const spreadName =
      i18n.language === "zh-TW" ? spread.name : t(`spread.${spread.id}`);
    const cardsText = lines.join("\n");
    const prompt = t("result.promptTemplate", { spreadName, cards: cardsText });

    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      sendGAEvent("event", "copy_prompt", { spread_type: spread.id });
    });
  };

  const reset = () => {
    router.push("/reading");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className={`text-center animate-fadeUp ${phase === "result" ? "mb-4" : "mb-10"}`}>
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {phase === "result" ? "解讀" : t("common.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {phase === "draw" && (
        <DrawPhase
          spread={spread}
          deck={deck}
          drawn={drawn}
          onDrawCard={drawCard}
          onComplete={onDrawComplete}
        />
      )}

      {phase === "result" && (
        <ResultPhase
          spread={spread}
          drawn={drawn}
          flippedCount={flippedCount}
          copied={copied}
          topic={topic}
          description={description}
          onFlipped={() => setFlippedCount((p) => p + 1)}
          onCopyPrompt={copyPrompt}
          onReset={reset}
        />
      )}
    </div>
  );
}
