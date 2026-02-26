"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TarotQuestionInputProps {
  onSubmit: (question: string) => void;
}

interface TemplateCategory {
  key: string;
  labelZh: string;
  labelEn: string;
  templates: { zh: string; en: string }[];
}

const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    key: "love",
    labelZh: "💕 感情類",
    labelEn: "💕 Love & Relationships",
    templates: [
      { zh: "他/她心裡怎麼看我？", en: "How does he/she see me in their heart?" },
      { zh: "我們會不會復合？", en: "Will we get back together?" },
      { zh: "這段感情的未來發展？", en: "What is the future of this relationship?" },
      { zh: "我什麼時候會遇到對的人？", en: "When will I meet the right person?" },
    ],
  },
  {
    key: "career",
    labelZh: "💼 工作類",
    labelEn: "💼 Career",
    templates: [
      { zh: "我換工作有機會嗎？", en: "Is it a good time to change jobs?" },
      { zh: "什麼時候會有新機會？", en: "When will a new opportunity come?" },
      { zh: "該選 A 還是 B？", en: "Should I choose option A or B?" },
      { zh: "我的職業發展方向？", en: "What is my career direction?" },
    ],
  },
  {
    key: "finance",
    labelZh: "💰 財務類",
    labelEn: "💰 Finance",
    templates: [
      { zh: "最近財運如何？", en: "How is my financial luck lately?" },
      { zh: "這個投資該不該做？", en: "Should I make this investment?" },
    ],
  },
];

export default function TarotQuestionInput({ onSubmit }: TarotQuestionInputProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith("zh");
  const [question, setQuestion] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleTemplateSelect = (template: { zh: string; en: string }) => {
    setQuestion(isZh ? template.zh : template.en);
    setOpenCategory(null);
  };

  const handleSubmit = () => {
    if (question.trim()) {
      onSubmit(question.trim());
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto animate-fadeUp">
      {/* Question input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={
          isZh
            ? "例如：我和他還有機會嗎？下個月適合換工作嗎？"
            : "e.g. Do we still have a chance? Is next month a good time to switch jobs?"
        }
        className="w-full h-28 px-4 py-3 rounded-xl
                   bg-white/[0.05] border border-purple-400/20
                   text-white/90 text-sm leading-relaxed
                   placeholder:text-white/30
                   focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20
                   resize-none transition-all"
      />

      {/* Template categories */}
      <div className="mt-4 mb-4">
        <div className="text-center text-white/30 text-xs mb-3 tracking-wider">
          {isZh ? "── 或選擇常見問題 ──" : "── or choose a common question ──"}
        </div>

        <div className="flex flex-col gap-2">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <div key={cat.key}>
              {/* Accordion header */}
              <button
                onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                className="w-full flex items-center justify-between px-4 py-2.5
                           rounded-lg bg-white/[0.03] border border-white/10
                           text-white/60 text-sm
                           hover:bg-white/[0.06] hover:border-white/20
                           transition-all"
              >
                <span>{isZh ? cat.labelZh : cat.labelEn}</span>
                <span
                  className="text-white/30 text-xs transition-transform duration-200"
                  style={{ transform: openCategory === cat.key ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  ▼
                </span>
              </button>

              {/* Accordion content */}
              {openCategory === cat.key && (
                <div className="mt-1 ml-2 flex flex-col gap-1">
                  {cat.templates.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => handleTemplateSelect(t)}
                      className="text-left px-4 py-2 rounded-lg
                                 text-white/50 text-sm
                                 hover:bg-purple-500/10 hover:text-purple-300
                                 transition-all"
                    >
                      {isZh ? t.zh : t.en}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!question.trim()}
        className="w-full py-3.5 rounded-full
                   border border-purple-400/35
                   bg-gradient-to-r from-purple-500/[0.08] to-purple-400/[0.02]
                   text-purple-300/90 text-base tracking-[2px]
                   hover:border-purple-400/60 hover:scale-[1.02]
                   hover:shadow-[0_0_30px_rgba(160,100,255,0.15)]
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-300"
      >
        {isZh ? "🃏 開始抽牌" : "🃏 Start Drawing"}
      </button>
    </div>
  );
}
