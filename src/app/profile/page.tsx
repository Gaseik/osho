"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import SideMenu from "../../components/SideMenu";
import UserProfileEditor from "../../components/UserProfileEditor";
import {
  getUserProfile,
  clearUserProfile,
  type UserProfile,
} from "../../utils/userProfile";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(!!getUserProfile());
  }, []);

  const handleSave = (_profile: UserProfile) => {
    setHasProfile(true);
    setSaved(true);
    setCleared(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    clearUserProfile();
    setHasProfile(false);
    setCleared(true);
    setSaved(false);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-8">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("profile.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
        <p className="text-white/50 text-sm mt-3">{t("profile.subtitle")}</p>
      </div>

      {/* Form */}
      <div className="animate-fadeUp max-w-[400px] w-full">
        <div className="bg-white/[0.03] rounded-xl border border-zen-gold/15 p-6">
          <UserProfileEditor onSave={handleSave} />
        </div>

        {/* Feedback */}
        {saved && (
          <div className="mt-4 text-center text-zen-gold/80 text-sm tracking-wider animate-fadeUp">
            ✓ {t("profile.saved")}
          </div>
        )}

        {/* Clear button */}
        {hasProfile && !saved && (
          <button
            onClick={handleClear}
            className="mt-4 w-full py-2 rounded-lg border border-white/10
                       bg-white/[0.02] text-white/40 text-xs tracking-wider
                       hover:bg-white/[0.06] hover:text-white/60 transition-all duration-300"
          >
            {t("profile.clear")}
          </button>
        )}

        {cleared && (
          <div className="mt-4 text-center text-white/50 text-sm tracking-wider animate-fadeUp">
            ✓ {t("profile.cleared")}
          </div>
        )}

        {/* Back to reading */}
        <Link
          href="/reading"
          className="block mt-6 text-center text-zen-gold-dim text-sm tracking-wider
                     hover:text-zen-gold transition-colors no-underline"
        >
          ← {t("profile.backToReading")}
        </Link>
      </div>
    </div>
  );
}
