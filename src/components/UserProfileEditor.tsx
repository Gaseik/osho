"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getUserProfile,
  saveUserProfile,
  type UserProfile,
} from "../utils/userProfile";

interface UserProfileEditorProps {
  onSave?: (profile: UserProfile) => void;
  onSkip?: () => void;
  compact?: boolean;
}

export default function UserProfileEditor({
  onSave,
  onSkip,
  compact = false,
}: UserProfileEditorProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const existing = getUserProfile();
    if (existing) {
      setName(existing.name);
      setGender(existing.gender);
      setAge(existing.age);
    }
  }, []);

  const handleSave = () => {
    const profile: UserProfile = { name, gender, age };
    saveUserProfile(profile);
    onSave?.(profile);
  };

  const genderOptions = [
    { value: "male", label: t("profile.genderMale") },
    { value: "female", label: t("profile.genderFemale") },
    { value: "other", label: t("profile.genderOther") },
  ];

  return (
    <div className={compact ? "w-full" : "w-full max-w-[400px]"}>
      {/* Name */}
      <div className="mb-4">
        <label className="block text-xs text-white/50 mb-1.5 tracking-wider">
          {t("profile.nameLabel")}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("profile.namePlaceholder")}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5
                     text-sm text-white/80 placeholder-white/30
                     focus:outline-none focus:border-zen-gold/30 transition-colors"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-xs text-white/50 mb-1.5 tracking-wider">
          {t("profile.genderLabel")}
        </label>
        <div className="flex gap-2">
          {genderOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setGender(opt.value)}
              className={`flex-1 py-2 rounded-lg border text-sm tracking-wider transition-all duration-300
                ${
                  gender === opt.value
                    ? "bg-zen-gold/15 border-zen-gold/40 text-zen-gold"
                    : "bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.08]"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="mb-5">
        <label className="block text-xs text-white/50 mb-1.5 tracking-wider">
          {t("profile.ageLabel")}
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={age}
          onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
          placeholder={t("profile.agePlaceholder")}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5
                     text-sm text-white/80 placeholder-white/30
                     focus:outline-none focus:border-zen-gold/30 transition-colors"
        />
      </div>

      {/* Actions */}
      <div className={compact ? "flex gap-3" : "flex flex-col gap-3"}>
        <button
          onClick={handleSave}
          className={`${compact ? "flex-1" : "w-full"} py-2.5 rounded-lg border border-zen-gold/30
                     bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                     hover:bg-zen-gold/[0.15] transition-all duration-300`}
        >
          {t("profile.save")}
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className={`${compact ? "flex-1" : "w-full"} py-2.5 rounded-lg border border-white/15
                       bg-white/[0.03] text-white/50 text-sm tracking-wider
                       hover:bg-white/[0.08] transition-all duration-300`}
          >
            {t("profile.skip")}
          </button>
        )}
      </div>
    </div>
  );
}
