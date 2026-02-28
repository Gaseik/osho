"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface QuestionCategory {
  labelKey: string;
  emoji: string;
  questionKeys: string[];
}

const CATEGORIES: QuestionCategory[] = [
  {
    labelKey: "tarot.categoryLove",
    emoji: "💕",
    questionKeys: ["tarot.lovQ1", "tarot.lovQ2", "tarot.lovQ3", "tarot.lovQ4"],
  },
  {
    labelKey: "tarot.categoryCareer",
    emoji: "💼",
    questionKeys: ["tarot.carQ1", "tarot.carQ2", "tarot.carQ3", "tarot.carQ4"],
  },
  {
    labelKey: "tarot.categoryFinance",
    emoji: "💰",
    questionKeys: ["tarot.finQ1", "tarot.finQ2"],
  },
];

interface TarotQuestionInputProps {
  question: string;
  onQuestionChange: (q: string) => void;
  onSubmit: () => void;
  buttonLabel?: string;
}

export default function TarotQuestionInput({
  question,
  onQuestionChange,
  onSubmit,
  buttonLabel,
}: TarotQuestionInputProps) {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (idx: number) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Question input */}
      <label className="block text-white/50 text-xs tracking-wider mb-2">
        {t("tarot.questionLabel")}
      </label>
      <textarea
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder={t("tarot.questionPlaceholder")}
        rows={3}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3
                   text-white/80 text-sm placeholder:text-white/25 resize-none
                   focus:outline-none focus:border-zen-gold/40 transition-colors"
      />

      {/* Template section */}
      <div className="mt-4 mb-5">
        <p className="text-center text-white/25 text-xs tracking-wider mb-3">
          {t("tarot.orChooseTemplate")}
        </p>

        <div className="space-y-1.5">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(idx)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
                           bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]
                           transition-colors text-left"
              >
                <span className="text-sm">{cat.emoji}</span>
                <span className="text-xs text-white/55 tracking-wider flex-1">
                  {t(cat.labelKey)}
                </span>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30 transition-transform duration-200"
                  style={{
                    transform: openCategory === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Questions list */}
              {openCategory === idx && (
                <div className="mt-1 ml-3 space-y-0.5">
                  {cat.questionKeys.map((qKey, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => {
                        onQuestionChange(t(qKey));
                        setOpenCategory(null);
                      }}
                      className="block w-full text-left px-3 py-1.5 text-xs text-white/45
                                 hover:text-zen-gold hover:bg-white/[0.03] rounded
                                 transition-colors"
                    >
                      {t(qKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Draw button */}
      <button
        onClick={onSubmit}
        className="w-full py-3.5 rounded-full border border-zen-gold/35
                   bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                   text-zen-gold/90 text-sm tracking-[2px]
                   hover:border-zen-gold/60 hover:scale-[1.02]
                   hover:shadow-[0_0_24px_rgba(255,215,0,0.12)]
                   transition-all duration-300"
      >
        ☯︎ {buttonLabel ?? t("tarot.startDrawing")}
      </button>
    </div>
  );
}
