"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SideMenu from "../../../../components/SideMenu";
import GuidedStepIndicator from "../../../../components/GuidedStepIndicator";
import { getUserProfile } from "../../../../utils/userProfile";

type CategoryId = "daily" | "relationship" | "career" | "decision" | "self" | "spiritual" | "custom";

const CATEGORIES: { id: Exclude<CategoryId, "custom">; labelKey: string; descKey: string }[] = [
  { id: "daily", labelKey: "guide.categoryDaily", descKey: "guide.categoryDailyDesc" },
  { id: "relationship", labelKey: "guide.categoryRelationship", descKey: "guide.categoryRelationshipDesc" },
  { id: "career", labelKey: "guide.categoryCareer", descKey: "guide.categoryCareerDesc" },
  { id: "decision", labelKey: "guide.categoryDecision", descKey: "guide.categoryDecisionDesc" },
  { id: "self", labelKey: "guide.categorySelf", descKey: "guide.categorySelfDesc" },
  { id: "spiritual", labelKey: "guide.categorySpiritual", descKey: "guide.categorySpiritualDesc" },
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

export default function GuidedCategoryPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showCustom, setShowCustom] = useState(false);
  const [customTopic, setCustomTopic] = useState("");

  const handleCategorySelect = (categoryId: Exclude<CategoryId, "custom">) => {
    const params = new URLSearchParams({ category: categoryId });
    router.push(`/reading/guided/describe?${params.toString()}`);
  };

  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      const params = new URLSearchParams({ category: "custom", topic: customTopic.trim() });
      router.push(`/reading/guided/spread?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (!getUserProfile()) {
      router.push("/reading/guided/profile");
    } else {
      router.push("/reading");
    }
  };

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-10">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("common.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      <GuidedStepIndicator currentStep={2} />

      <div className="animate-fadeUp max-w-[500px] w-full">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                     transition-colors duration-200"
        >
          ← {t("guide.backToLanding")}
        </button>

        {/* Category List */}
        <div className="flex flex-col gap-3">
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
          {!showCustom ? (
            <button
              onClick={() => setShowCustom(true)}
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
      </div>
    </div>
  );
}
