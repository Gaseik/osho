import { useState } from "react";
import { Card, CARDS, shuffle } from "./data/cards";
import { Spread } from "./data/spreads";
import SpreadSelector from "./components/SpreadSelector";
import DrawPhase from "./components/DrawPhase";
import ResultPhase from "./components/ResultPhase";

type Phase = "select" | "draw" | "result";

export default function App() {
  const [phase, setPhase] = useState<Phase>("select");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [deck, setDeck] = useState<Card[]>([]);
  const [drawn, setDrawn] = useState<Card[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectSpread = (s: Spread) => {
    setSpread(s);
    setDeck(shuffle(CARDS));
    setDrawn([]);
    setFlippedCount(0);
    setPhase("draw");
  };

  const drawCard = (idx: number) => {
    if (!spread || drawn.length >= spread.count) return;
    const card = deck[idx];
    setDrawn(p => [...p, card]);
    setDeck(p => p.filter((_, i) => i !== idx));
    if (drawn.length + 1 >= spread.count) {
      setTimeout(() => setPhase("result"), 300);
    }
  };

  const copyPrompt = () => {
    if (!spread) return;
    const labels = ["指引", "過去", "現在", "未來", "情境", "障礙", "建議", "根源", "結果"];
    const lines = drawn.map((c, i) =>
      `${labels[i] || `位置${i + 1}`}：${c.name}（${c.nameZh}）- ${c.meaning}`
    );
    const prompt = `我用「${spread.name}」牌陣抽了以下的禪卡，請幫我解讀：\n\n${lines.join("\n")}\n\n請根據每張牌的位置和含義，給我整體的解讀和建議。`;

    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setPhase("select");
    setSpread(null);
    setDrawn([]);
    setFlippedCount(0);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯ ZEN INSIGHT ☯
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          禪 意 靈 卡
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3" />
      </div>

      {/* Select Spread */}
      {phase === "select" && <SpreadSelector onSelectSpread={selectSpread} />}

      {/* Draw Phase */}
      {phase === "draw" && spread && (
        <DrawPhase
          spread={spread}
          deck={deck}
          drawn={drawn}
          onDrawCard={drawCard}
        />
      )}

      {/* Result Phase */}
      {phase === "result" && spread && (
        <ResultPhase
          spread={spread}
          drawn={drawn}
          flippedCount={flippedCount}
          copied={copied}
          onFlipped={() => setFlippedCount(p => p + 1)}
          onCopyPrompt={copyPrompt}
          onReset={reset}
        />
      )}
    </div>
  );
}
