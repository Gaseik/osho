"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import SideMenu from "../../../../components/SideMenu";
import GuidedStepIndicator from "../../../../components/GuidedStepIndicator";
import { SPREADS } from "../../../../data/spreads";

type CategoryId = "daily" | "relationship" | "career" | "decision" | "self" | "spiritual" | "custom";

interface CategoryConfig {
  id: Exclude<CategoryId, "custom">;
  spreadIds: string[];
}

const CATEGORY_SPREADS: CategoryConfig[] = [
  { id: "daily", spreadIds: ["single", "three", "time-flow"] },
  { id: "relationship", spreadIds: ["relationship", "cross", "mirror"] },
  { id: "career", spreadIds: ["cross", "diamond", "three"] },
  { id: "decision", spreadIds: ["two-choice", "diamond", "cross"] },
  { id: "self", spreadIds: ["key", "diamond", "cross"] },
  { id: "spiritual", spreadIds: ["key", "mirror", "time-flow"] },
];

const CATEGORY_LABEL_KEYS: Record<Exclude<CategoryId, "custom">, string> = {
  daily: "guide.categoryDaily",
  relationship: "guide.categoryRelationship",
  career: "guide.categoryCareer",
  decision: "guide.categoryDecision",
  self: "guide.categorySelf",
  spiritual: "guide.categorySpiritual",
};

function SpreadContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") as CategoryId | null;
  const customTopic = searchParams.get("topic") || "";
  const desc = searchParams.get("desc") || "";

  const spreadIds = category === "custom"
    ? SPREADS.map((s) => s.id)
    : CATEGORY_SPREADS.find((c) => c.id === category)?.spreadIds ?? [];

  const getTopicText = (): string => {
    if (category === "custom") return customTopic;
    if (!category) return "";
    return t(CATEGORY_LABEL_KEYS[category] ?? "");
  };

  const handleSpreadSelect = (spreadId: string) => {
    const topic = getTopicText();
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (category !== "custom" && desc) params.set("desc", desc);
    const queryString = params.toString();
    router.push(`/reading/${spreadId}${queryString ? `?${queryString}` : ""}`);
  };

  const handleBack = () => {
    if (category === "custom") {
      router.push("/reading/guided/category");
    } else {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      router.push(`/reading/guided/describe?${params.toString()}`);
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

      <GuidedStepIndicator currentStep={4} />

      <div className="animate-fadeUp max-w-[500px] w-full">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                     transition-colors duration-200"
        >
          ← {t("guide.backToLanding")}
        </button>

        {/* Spread List */}
        <div className="flex flex-col gap-3">
          {spreadIds.map((spreadId, idx) => {
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
      </div>
    </div>
  );
}

export default function GuidedSpreadPage() {
  return (
    <Suspense>
      <SpreadContent />
    </Suspense>
  );
}
