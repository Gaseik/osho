"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import SideMenu from "../../../../components/SideMenu";
import GuidedStepIndicator from "../../../../components/GuidedStepIndicator";

type CategoryId = "daily" | "relationship" | "career" | "decision" | "self" | "spiritual";

const DESCRIBE_PLACEHOLDER_KEYS: Record<CategoryId, string> = {
  daily: "guide.describePlaceholderDaily",
  relationship: "guide.describePlaceholderRelationship",
  career: "guide.describePlaceholderCareer",
  decision: "guide.describePlaceholderDecision",
  self: "guide.describePlaceholderSelf",
  spiritual: "guide.describePlaceholderSpiritual",
};

function DescribeContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as CategoryId | null;
  const [situationDesc, setSituationDesc] = useState("");

  const handleNext = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (situationDesc.trim()) params.set("desc", situationDesc.trim());
    router.push(`/reading/guided/spread?${params.toString()}`);
  };

  const handleSkip = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    router.push(`/reading/guided/spread?${params.toString()}`);
  };

  const placeholderKey = category && DESCRIBE_PLACEHOLDER_KEYS[category]
    ? DESCRIBE_PLACEHOLDER_KEYS[category]
    : "guide.describePlaceholderDaily";

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

      <GuidedStepIndicator currentStep={3} />

      <div className="animate-fadeUp max-w-[500px] w-full">
        {/* Back Button */}
        <button
          onClick={() => router.push("/reading/guided/category")}
          className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                     transition-colors duration-200"
        >
          ← {t("guide.backToLanding")}
        </button>

        {/* Describe Situation */}
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
            placeholder={t(placeholderKey)}
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
            onClick={handleNext}
            className="mt-3 w-full px-5 py-2.5 rounded-lg border border-zen-gold/30
                     bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                     hover:bg-zen-gold/[0.15] transition-all duration-300"
          >
            {t("guide.describeNext")}
          </button>
          <button
            onClick={handleSkip}
            className="mt-2 w-full text-white/35 text-xs tracking-wider
                     hover:text-white/55 transition-colors duration-200"
          >
            {t("guide.describeSkip")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidedDescribePage() {
  return (
    <Suspense>
      <DescribeContent />
    </Suspense>
  );
}
