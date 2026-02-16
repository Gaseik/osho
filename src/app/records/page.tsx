"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import {
  getRecords,
  updateRecord,
  deleteRecord,
  type DivinationRecord,
} from "../../utils/divinationRecords";

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

function RecordCard({
  record,
  onUpdate,
  onDelete,
}: {
  record: DivinationRecord;
  onUpdate: (id: string, review: string) => void;
  onDelete: (id: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [review, setReview] = useState(record.review);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const spreadName =
    i18n.language === "zh-TW" ? record.spreadName : record.spreadNameEn;

  const handleSaveReview = () => {
    onUpdate(record.id, review);
    setEditing(false);
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(record.id);
  };

  return (
    <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-5 transition-all duration-300 hover:border-zen-gold/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-zen-gold text-sm tracking-wider font-medium">
            {spreadName}
          </div>
          <div className="text-white/30 text-[10px] mt-1">
            {formatDateTime(record.createdAt, i18n.language)}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className={`text-[10px] px-2 py-1 rounded transition-all duration-200 ${
            confirmDelete
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "text-white/20 hover:text-white/50"
          }`}
        >
          {confirmDelete ? t("record.confirmDelete") : "×"}
        </button>
      </div>

      {/* Question */}
      {record.question && (
        <div className="mb-3">
          <div className="text-[10px] text-zen-gold/40 mb-1 tracking-wider">
            {t("record.question")}
          </div>
          <div className="text-xs text-white/60 leading-relaxed">
            {record.question}
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="mb-3">
        <div className="text-[10px] text-zen-gold/40 mb-2 tracking-wider">
          {t("record.cards")}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {record.cards.map((card, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-md bg-zen-gold/[0.06] border border-zen-gold/10 text-white/50"
            >
              {i18n.language === "zh-TW"
                ? card.nameZh
                : card.name}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-3" />

      {/* Review section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] text-zen-gold/40 tracking-wider">
            {t("record.review")}
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-[10px] text-zen-gold/40 hover:text-zen-gold/70 transition-colors"
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
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveReview}
                className="px-4 py-1.5 rounded-lg border border-zen-gold/30
                         bg-zen-gold/[0.08] text-zen-gold text-[11px] tracking-wider
                         hover:bg-zen-gold/[0.15] transition-all duration-300"
              >
                {t("record.saveReview")}
              </button>
              <button
                onClick={() => {
                  setReview(record.review);
                  setEditing(false);
                }}
                className="px-4 py-1.5 rounded-lg border border-white/10
                         text-white/40 text-[11px] tracking-wider
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
              <div className="text-[10px] text-white/20 mt-2">
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
    </div>
  );
}

export default function RecordsPage() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<DivinationRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecords(getRecords());
    setMounted(true);
  }, []);

  const handleUpdate = (id: string, review: string) => {
    const reviewedAt = new Date().toISOString();
    updateRecord(id, { review, reviewedAt });
    setRecords(getRecords());
  };

  const handleDelete = (id: string) => {
    deleteRecord(id);
    setRecords(getRecords());
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <LanguageSwitcher />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-8">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("record.pageTitle")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* Back to reading */}
      <Link
        href="/reading"
        className="text-zen-gold/50 text-xs tracking-wider hover:text-zen-gold/80
                   transition-colors mb-6"
      >
        ← {t("record.backToReading")}
      </Link>

      {/* Records */}
      <div className="w-full max-w-[540px] flex flex-col gap-4 animate-fadeUp">
        {records.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-white/20 text-sm mb-4">
              {t("record.empty")}
            </div>
            <Link
              href="/reading"
              className="inline-block px-6 py-2.5 rounded-lg border border-zen-gold/30
                       bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                       hover:bg-zen-gold/[0.15] transition-all duration-300"
            >
              {t("record.goReading")}
            </Link>
          </div>
        ) : (
          records.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
