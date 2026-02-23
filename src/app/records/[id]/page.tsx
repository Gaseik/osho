"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import CardSpreadLayout from "../../../components/CardSpreadLayout";
import StaticCard from "../../../components/StaticCard";
import MarkdownReading from "../../../components/MarkdownReading";
import { POSITION_LABELS, SPREAD_LAYOUTS } from "../../../data/spreads";
import { CARD_DETAILS, type Card } from "../../../data/cards";
import {
  getRecords,
  updateRecord,
  deleteRecord,
  type DivinationRecord,
} from "../../../utils/divinationRecords";

function formatDateTime(iso: string, locale: string): string {
  const d = new Date(iso);
  if (locale === "zh-TW") {
    return d.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecordDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<DivinationRecord | null>(null);
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [review, setReview] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const records = getRecords();
    const found = records.find((r) => r.id === params.id);
    if (found) {
      setRecord(found);
      setReview(found.review);
    }
    setMounted(true);
  }, [params.id]);

  if (!mounted) return null;

  if (!record) {
    return (
      <div className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark text-white font-serif flex flex-col items-center justify-center px-4">
        <LanguageSwitcher />
        <div className="text-white/40 text-sm mb-4">{t("record.notFound")}</div>
      </div>
    );
  }

  const spreadName =
    i18n.language === "zh-TW" ? record.spreadName : record.spreadNameEn;

  const getLabels = (): string[] => {
    if (i18n.language === "zh-TW") {
      return POSITION_LABELS[record.spreadId] || [];
    }
    return Array.from({ length: record.cards.length }, (_, i) =>
      t(`spread.${record.spreadId}Labels.${i}`)
    );
  };

  const labels = getLabels();
  const layout = SPREAD_LAYOUTS[record.spreadId];

  const handleSaveReview = () => {
    const reviewedAt = new Date().toISOString();
    updateRecord(record.id, { review, reviewedAt });
    setRecord({ ...record, review, reviewedAt });
    setEditing(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteRecord(record.id);
    router.push("/records");
  };

  const renderCard = (cardIdx: number) => {
    const saved = record.cards[cardIdx];
    const full = CARD_DETAILS.find((c) => c.id === saved.id);
    const card: Card = full ?? { ...saved, slug: "", suit: "major", keywords: [], keywordsZh: [], description: "", descriptionZh: "" };
    return <StaticCard card={card} label={labels[cardIdx] || ""} />;
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark text-white font-serif flex flex-col items-center px-4 py-10">
      <LanguageSwitcher />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-4">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {spreadName}
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent mx-auto mt-3" />
        <div className="text-white/30 text-[11px] mt-3">
          {formatDateTime(record.createdAt, i18n.language)}
        </div>
      </div>

      {/* Question */}
      {record.question && (
        <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-4 max-w-[500px] w-full mb-6 animate-fadeUp">
          <div className="text-[10px] text-zen-gold/40 mb-1 tracking-wider">
            {t("record.question")}
          </div>
          <div className="text-sm text-white/60 leading-relaxed">
            {record.question}
          </div>
        </div>
      )}

      {/* Cards display */}
      <div className={`animate-fadeUp text-center w-full ${layout ? "max-w-[900px]" : "max-w-[700px]"}`}>
        <CardSpreadLayout
          spreadId={record.spreadId}
          cardCount={record.cards.length}
          renderCard={renderCard}
        />
      </div>

      {/* AI Reading */}
      {record.aiReading && (
        <div className="w-full max-w-[500px] animate-fadeUp mt-6">
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/20 p-5">
            <div className="text-[11px] text-zen-gold/50 mb-3 tracking-wider">
              {t("record.aiReading")}
            </div>
            <div className="text-sm leading-relaxed">
              <MarkdownReading content={record.aiReading} />
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="w-10 h-px bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent my-4" />

      {/* Review section */}
      <div className="w-full max-w-[500px] animate-fadeUp">
        <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] text-zen-gold/50 tracking-wider">
              {t("record.review")}
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-[11px] text-zen-gold/40 hover:text-zen-gold/70 transition-colors"
              >
                {record.review ? t("record.editReview") : t("record.addReview")}
              </button>
            )}
          </div>

          {editing ? (
            <div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={t("record.reviewPlaceholder")}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2
                         text-xs text-white/70 placeholder-white/30 resize-none
                         focus:outline-none focus:border-zen-gold/30 transition-colors"
                rows={4}
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSaveReview}
                  className="px-5 py-2 rounded-lg border border-zen-gold/30
                           bg-zen-gold/[0.08] text-zen-gold text-xs tracking-wider
                           hover:bg-zen-gold/[0.15] transition-all duration-300"
                >
                  {t("record.saveReview")}
                </button>
                <button
                  onClick={() => {
                    setReview(record.review);
                    setEditing(false);
                  }}
                  className="px-5 py-2 rounded-lg border border-white/10
                           text-white/40 text-xs tracking-wider
                           hover:bg-white/[0.05] transition-all duration-300"
                >
                  {t("record.cancel")}
                </button>
              </div>
            </div>
          ) : record.review ? (
            <div>
              <div className="text-xs text-white/50 leading-relaxed whitespace-pre-line">
                {record.review}
              </div>
              {record.reviewedAt && (
                <div className="text-[10px] text-white/20 mt-3">
                  {t("record.reviewedAt")}{" "}
                  {formatDateTime(record.reviewedAt, i18n.language)}
                </div>
              )}
            </div>
          ) : (
            <div className="text-[11px] text-white/20 italic">
              {t("record.noReview")}
            </div>
          )}
        </div>

        {/* Delete */}
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={handleDelete}
            className={`text-xs px-5 py-2 rounded-lg border transition-all duration-200 ${
              confirmDelete
                ? "bg-red-500/20 text-red-400 border-red-500/30"
                : "text-white/25 border-white/10 hover:text-white/50 hover:border-white/20"
            }`}
          >
            {confirmDelete ? t("record.confirmDelete") : t("record.deleteRecord")}
          </button>
        </div>
      </div>
    </div>
  );
}
