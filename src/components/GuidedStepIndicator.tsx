"use client";

import { useTranslation } from "react-i18next";

const TOTAL_STEPS = 4;

interface GuidedStepIndicatorProps {
  currentStep: number; // 1-4
}

export default function GuidedStepIndicator({ currentStep }: GuidedStepIndicatorProps) {
  const { t } = useTranslation();

  const stepLabels = [
    t("guide.stepProfile"),
    t("guide.stepCategory"),
    t("guide.stepDescribe"),
    t("guide.stepSpread"),
  ];

  return (
    <div className="w-full max-w-[500px]">
      {/* Step Dots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                ${s === currentStep
                  ? "bg-zen-gold scale-110"
                  : s < currentStep
                    ? "bg-zen-gold/50"
                    : "bg-white/15"
                }`}
            />
            {s < TOTAL_STEPS && (
              <div className={`w-8 h-px transition-colors duration-300 ${s < currentStep ? "bg-zen-gold/30" : "bg-white/10"}`} />
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
              ${i + 1 === currentStep ? "text-zen-gold/80" : "text-white/30"}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
