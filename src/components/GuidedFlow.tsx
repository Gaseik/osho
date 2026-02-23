"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import UserProfileEditor from "./UserProfileEditor";
import { getUserProfile } from "../utils/userProfile";
import { SPREADS } from "../data/spreads";

type CategoryId = "daily" | "relationship" | "career" | "decision" | "self" | "spiritual" | "custom";

interface CategoryConfig {
  id: CategoryId;
  labelKey: string;
  descKey: string;
  spreadIds: string[];
}

const CATEGORIES: CategoryConfig[] = [
  { id: "daily", labelKey: "guide.categoryDaily", descKey: "guide.categoryDailyDesc", spreadIds: ["single", "three", "time-flow"] },
  { id: "relationship", labelKey: "guide.categoryRelationship", descKey: "guide.categoryRelationshipDesc", spreadIds: ["relationship", "cross", "mirror"] },
  { id: "career", labelKey: "guide.categoryCareer", descKey: "guide.categoryCareerDesc", spreadIds: ["cross", "diamond", "three"] },
  { id: "decision", labelKey: "guide.categoryDecision", descKey: "guide.categoryDecisionDesc", spreadIds: ["two-choice", "diamond", "cross"] },
  { id: "self", labelKey: "guide.categorySelf", descKey: "guide.categorySelfDesc", spreadIds: ["key", "diamond", "cross"] },
  { id: "spiritual", labelKey: "guide.categorySpiritual", descKey: "guide.categorySpiritualDesc", spreadIds: ["key", "mirror", "time-flow"] },
];

const CATEGORY_ICONS: Record<CategoryId, string> = {
  daily: "☀",
  relationship: "♡",
  career: "✦",
  decision: "⚖",
  self: "◎",
  spiritual: "❋",
  custom: "✎",
};

// Dynamic placeholder keys per category
const DESCRIBE_PLACEHOLDER_KEYS: Record<Exclude<CategoryId, "custom">, string> = {
  daily: "guide.describePlaceholderDaily",
  relationship: "guide.describePlaceholderRelationship",
  career: "guide.describePlaceholderCareer",
  decision: "guide.describePlaceholderDecision",
  self: "guide.describePlaceholderSelf",
  spiritual: "guide.describePlaceholderSpiritual",
};

// Steps: 1=profile, 2=category, 3=describe situation, 4=spread selection
const TOTAL_STEPS = 4;

interface GuidedFlowProps {
  onBack: () => void;
}

export default function GuidedFlow({ onBack }: GuidedFlowProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [situationDesc, setSituationDesc] = useState("");

  // Auto-skip step 1 if profile already exists
  useEffect(() => {
    if (getUserProfile()) {
      setStep(2);
    }
  }, []);

  const handleProfileSave = () => {
    setStep(2);
  };

  const handleProfileSkip = () => {
    setStep(2);
  };

  const handleCategorySelect = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId !== "custom") {
      setStep(3); // go to describe step
    }
  };

  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      setStep(4); // custom already has description, skip to spread selection
    }
  };

  const handleDescribeNext = () => {
    setStep(4);
  };

  const handleDescribeSkip = () => {
    setSituationDesc("");
    setStep(4);
  };

  const getTopicText = (): string => {
    if (selectedCategory === "custom") return customTopic.trim();
    if (!selectedCategory) return "";
    return t(CATEGORIES.find((c) => c.id === selectedCategory)?.labelKey ?? "");
  };

  const handleSpreadSelect = (spreadId: string) => {
    const topic = getTopicText();
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (selectedCategory !== "custom" && situationDesc.trim()) {
      params.set("desc", situationDesc.trim());
    }
    const queryString = params.toString();
    router.push(`/reading/${spreadId}${queryString ? `?${queryString}` : ""}`);
  };

  const handleStepBack = () => {
    if (step === 4) {
      if (selectedCategory === "custom") {
        setStep(2); // custom has no describe step
      } else {
        setStep(3); // back to describe
      }
    } else if (step === 3) {
      setSituationDesc("");
      setSelectedCategory(null);
      setStep(2);
    } else if (step === 2) {
      if (!getUserProfile()) {
        setStep(1);
      } else {
        onBack();
      }
    } else {
      onBack();
    }
  };

  // For custom topic, show all spreads; otherwise show category-specific ones
  const selectedCategorySpreads = selectedCategory === "custom"
    ? SPREADS.map((s) => s.id)
    : selectedCategory
      ? CATEGORIES.find((c) => c.id === selectedCategory)?.spreadIds ?? []
      : [];

  const stepLabels = [
    t("guide.stepProfile"),
    t("guide.stepCategory"),
    t("guide.stepDescribe"),
    t("guide.stepSpread"),
  ];

  return (
    <div className="animate-fadeUp max-w-[500px] w-full">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                ${s === step
                  ? "bg-zen-gold scale-110"
                  : s < step
                    ? "bg-zen-gold/50"
                    : "bg-white/15"
                }`}
            />
            {s < TOTAL_STEPS && (
              <div className={`w-8 h-px transition-colors duration-300 ${s < step ? "bg-zen-gold/30" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mb-6 px-2">
        {stepLabels.map((label, i) => (
          <span
            key={i}
            className={`text-[10px] tracking-wider transition-colors duration-300
              ${i + 1 === step ? "text-zen-gold/80" : "text-white/30"}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={handleStepBack}
        className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                   transition-colors duration-200"
      >
        ← {t("guide.backToLanding")}
      </button>

      {/* Step 1: Profile */}
      {step === 1 && (
        <div className="animate-fadeUp">
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/15 p-5">
            <UserProfileEditor
              compact
              onSave={handleProfileSave}
              onSkip={handleProfileSkip}
            />
          </div>
        </div>
      )}

      {/* Step 2: Category Selection */}
      {step === 2 && (
        <div className="animate-fadeUp flex flex-col gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="p-4 px-5 rounded-xl bg-white/[0.03] border border-zen-gold/15
                       transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/40
                       text-left flex items-center gap-4"
            >
              <span className="text-2xl w-8 text-center opacity-70">
                {CATEGORY_ICONS[cat.id]}
              </span>
              <div>
                <div className="text-[15px] text-white/90">{t(cat.labelKey)}</div>
                <div className="text-xs text-white/45 mt-0.5">{t(cat.descKey)}</div>
              </div>
            </button>
          ))}

          {/* Custom Topic Option */}
          {selectedCategory !== "custom" ? (
            <button
              onClick={() => handleCategorySelect("custom")}
              className="p-4 px-5 rounded-xl bg-white/[0.03] border border-dashed border-white/20
                       transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/30
                       text-left flex items-center gap-4"
            >
              <span className="text-2xl w-8 text-center opacity-70">
                {CATEGORY_ICONS.custom}
              </span>
              <div>
                <div className="text-[15px] text-white/90">{t("guide.categoryCustom")}</div>
                <div className="text-xs text-white/45 mt-0.5">{t("guide.categoryCustomDesc")}</div>
              </div>
            </button>
          ) : (
            <div className="animate-fadeUp p-4 px-5 rounded-xl bg-white/[0.03] border border-zen-gold/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg opacity-70">{CATEGORY_ICONS.custom}</span>
                <span className="text-[15px] text-white/90">{t("guide.categoryCustom")}</span>
              </div>
              <textarea
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder={t("guide.customTopicPlaceholder")}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5
                         text-sm text-white/70 placeholder-white/30 resize-none
                         focus:outline-none focus:border-zen-gold/30 transition-colors"
                rows={2}
                autoFocus
              />
              <button
                onClick={handleCustomTopicSubmit}
                disabled={!customTopic.trim()}
                className="mt-3 w-full px-5 py-2.5 rounded-lg border border-zen-gold/30
                         bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                         hover:bg-zen-gold/[0.15] transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t("guide.customTopicSubmit")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Describe Situation (optional, preset categories only) */}
      {step === 3 && selectedCategory && selectedCategory !== "custom" && (
        <div className="animate-fadeUp">
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/15 p-5">
            <div className="text-[15px] text-white/90 mb-1">
              {t("guide.describeTitle")}
            </div>
            <div className="text-xs text-white/40 mb-4">
              {t("guide.describeSubtitle")}
            </div>
            <textarea
              value={situationDesc}
              onChange={(e) => {
                if (e.target.value.length <= 100) setSituationDesc(e.target.value);
              }}
              placeholder={t(DESCRIBE_PLACEHOLDER_KEYS[selectedCategory])}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5
                       text-sm text-white/70 placeholder-white/30 resize-none
                       focus:outline-none focus:border-zen-gold/30 transition-colors"
              rows={3}
              autoFocus
            />
            <div className="text-right text-[10px] text-white/25 mt-1">
              {situationDesc.length}/100
            </div>
            <button
              onClick={handleDescribeNext}
              className="mt-3 w-full px-5 py-2.5 rounded-lg border border-zen-gold/30
                       bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                       hover:bg-zen-gold/[0.15] transition-all duration-300"
            >
              {t("guide.describeNext")}
            </button>
            <button
              onClick={handleDescribeSkip}
              className="mt-2 w-full text-white/35 text-xs tracking-wider
                       hover:text-white/55 transition-colors duration-200"
            >
              {t("guide.describeSkip")}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Recommended Spreads */}
      {step === 4 && selectedCategory && (
        <div className="animate-fadeUp flex flex-col gap-3">
          {selectedCategorySpreads.map((spreadId, idx) => {
            const spreadData = SPREADS.find((s) => s.id === spreadId);
            if (!spreadData) return null;
            return (
              <button
                key={spreadId}
                onClick={() => handleSpreadSelect(spreadId)}
                className="p-5 px-6 rounded-xl bg-white/[0.03] border border-zen-gold/15
                         transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/40
                         text-left"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] text-white/90">
                      {t(`spread.${spreadId}`)}
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] bg-zen-gold/20 text-zen-gold
                                       px-2 py-0.5 rounded-full border border-zen-gold/30 tracking-wider">
                        {t("guide.recommended")}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zen-gold-dim">
                    {spreadData.count}{t("spread.cards")}
                  </div>
                </div>
                <div className="text-xs text-white/45 mt-1.5">
                  {t(`spread.${spreadId}Desc`)}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
