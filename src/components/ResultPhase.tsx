import { useRef } from "react";
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS } from "../data/spreads";
import FlipCard from "./FlipCard";

interface ResultPhaseProps {
  spread: Spread;
  drawn: Card[];
  flippedCount: number;
  copied: boolean;
  onFlipped: () => void;
  onCopyPrompt: () => void;
  onReset: () => void;
}

export default function ResultPhase({
  spread,
  drawn,
  flippedCount,
  copied,
  onFlipped,
  onCopyPrompt,
  onReset,
}: ResultPhaseProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  const genPrompt = () => {
    const labels = POSITION_LABELS[spread.id];
    const lines = drawn.map((c, i) =>
      `${labels[i]}：${c.name}（${c.nameZh}）- ${c.meaning}`
    );
    return `我用「${spread.name}」牌陣抽了以下的禪卡，請幫我解讀：\n\n${lines.join("\n")}\n\n請根據每張牌的位置和含義，給我整體的解讀和建議。`;
  };

  return (
    <div className="animate-fadeUp text-center w-full max-w-[700px]">
      <p className="text-white/60 text-sm mb-6">
        點擊牌片翻面
      </p>

      {/* Cards */}
      <div
        ref={resultRef}
        className="flex gap-5 justify-center flex-wrap mb-8 p-5"
      >
        {drawn.map((card, i) => (
          <div
            key={card.id}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-[11px] text-zen-gold-dim tracking-widest">
              {POSITION_LABELS[spread.id][i]}
            </div>
            <FlipCard
              card={card}
              label={POSITION_LABELS[spread.id][i]}
              delay={i * 200}
              onFlipped={onFlipped}
            />
          </div>
        ))}
      </div>

      {/* Actions - show after all flipped */}
      {flippedCount >= spread.count && (
        <div className="animate-fadeUp flex flex-col items-center gap-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent mb-2" />

          {/* Prompt Preview */}
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-4 max-w-[500px] w-full text-left mb-2">
            <div className="text-[11px] text-zen-gold/50 mb-2 tracking-wider">
              PROMPT 預覽
            </div>
            <div className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
              {genPrompt()}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={onCopyPrompt}
              className={`px-7 py-3 rounded-lg border transition-all duration-300 text-sm tracking-wider
                ${copied
                  ? 'bg-zen-gold/20 border-zen-gold/40 text-zen-gold'
                  : 'bg-zen-gold/[0.08] border-zen-gold/40 text-zen-gold hover:bg-zen-gold/[0.15]'
                }`}
            >
              {copied ? "✓ 已複製" : "複製 Prompt"}
            </button>
            <button
              onClick={onReset}
              className="px-7 py-3 rounded-lg border border-white/15 bg-white/[0.03] text-white/60
                       hover:bg-white/[0.08] transition-all duration-300 text-sm tracking-wider"
            >
              重新抽牌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
