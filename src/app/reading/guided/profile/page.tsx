"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SideMenu from "../../../../components/SideMenu";
import GuidedStepIndicator from "../../../../components/GuidedStepIndicator";
import UserProfileEditor from "../../../../components/UserProfileEditor";
import { getUserProfile } from "../../../../utils/userProfile";

export default function GuidedProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // Auto-skip to category if profile already exists
  useEffect(() => {
    if (getUserProfile()) {
      router.replace("/reading/guided/category");
    } else {
      setReady(true);
    }
  }, [router]);

  const handleProfileSave = () => {
    router.push("/reading/guided/category");
  };

  const handleProfileSkip = () => {
    router.push("/reading/guided/category");
  };

  if (!ready) return null;

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

      <GuidedStepIndicator currentStep={1} />

      <div className="animate-fadeUp max-w-[500px] w-full">
        {/* Back Button */}
        <button
          onClick={() => router.push("/reading")}
          className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                     transition-colors duration-200"
        >
          ← {t("guide.backToLanding")}
        </button>

        {/* Profile Editor */}
        <div className="bg-white/[0.03] rounded-xl border border-zen-gold/15 p-5">
          <UserProfileEditor
            compact
            onSave={handleProfileSave}
            onSkip={handleProfileSkip}
          />
        </div>
      </div>
    </div>
  );
}
