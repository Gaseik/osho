"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useTranslation } from "react-i18next";
import SideMenu from "./SideMenu";
import DrawPhase from "./DrawPhase";
import ResultPhase from "./ResultPhase";
import FlipCard from "./FlipCard";
import TarotCardFace from "./TarotCardFace";
import { allTarotCards, type TarotCard } from "../data/tarot-cards";
import { TAROT_SPREADS, type TarotSpread } from "../data/tarot-spreads";
import { TAROT_SPREAD_DETAILS } from "../data/tarot-spread-details";
import { shuffle, type Card } from "../data/cards";
import type { SpreadLayout } from "../data/spreads";
import { getUserProfile } from "../utils/userProfile";

type Step = "category" | "describe" | "validation" | "spreadSelect" | "draw" | "result";

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

const DESCRIBE_PLACEHOLDER_KEYS: Record<Exclude<CategoryId, "custom">, string> = {
  daily: "guide.describePlaceholderDaily",
  relationship: "guide.describePlaceholderRelationship",
  career: "guide.describePlaceholderCareer",
  decision: "guide.describePlaceholderDecision",
  self: "guide.describePlaceholderSelf",
  spiritual: "guide.describePlaceholderSpiritual",
};

/** Dummy Card adapter — ResultPhase needs Card[] but we only use customRenderCard */
function toOshoCard(tc: TarotCard): Card {
  return {
    id: tc.id,
    slug: tc.name.en.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: tc.name.en,
    nameZh: tc.name.zh,
    suit: "major",
    keywords: tc.keywords.en,
    keywordsZh: tc.keywords.zh,
    description: tc.upright.en,
    descriptionZh: tc.upright.zh,
  };
}

/** Tarot spread layouts for CardSpreadLayout */
const TAROT_LAYOUTS: Record<string, SpreadLayout> = {
  "celtic-cross": {
    cols: 6,
    rows: [
      { type: "cards", cells: [null, null, 4, null, null, null] },
      { type: "cards", cells: [null, 3, 0, 5, null, 9] },
      { type: "cards", cells: [null, null, 2, null, null, 8] },
      { type: "cards", cells: [null, null, null, null, null, 7] },
      { type: "cards", cells: [null, null, null, null, null, 6] },
    ],
  },
  relationship: {
    cols: 3,
    rows: [
      { type: "cards", cells: [0, 2, 1] },
      { type: "cards", cells: [null, null, null] },
      { type: "cards", cells: [3, null, 4] },
      { type: "cards", cells: [null, 5, null] },
      { type: "cards", cells: [null, 6, null] },
    ],
  },
};

/** Recommend spread based on question keywords */
function recommendSpread(question: string): string | null {
  const q = question.toLowerCase();
  const lovWords = ["他", "她", "感情", "love", "relationship", "復合", "曖昧", "心裡", "分手", "對象"];
  const deepWords = ["人生", "方向", "未來", "career", "life", "深度", "全面"];
  if (lovWords.some((w) => q.includes(w))) return "relationship";
  if (deepWords.some((w) => q.includes(w))) return "celtic-cross";
  return null;
}

export default function TarotFlowPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";

  // ─── Step state ───
  const [step, setStep] = useState<Step>("category");
  const [question, setQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [situationDesc, setSituationDesc] = useState("");

  // ─── Validation ───
  const [validationCards, setValidationCards] = useState<
    { card: TarotCard; isReversed: boolean }[]
  >([]);
  const [validationText, setValidationText] = useState("");
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationAttempt, setValidationAttempt] = useState(0);
  const [validationRevealed, setValidationRevealed] = useState(false);
  const [validationFlipped, setValidationFlipped] = useState(0);

  // ─── Spread selection ───
  const [selectedSpreadId, setSelectedSpreadId] = useState<string | null>(null);

  // ─── Draw phase ───
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [drawn, setDrawn] = useState<TarotCard[]>([]);
  const [reversedStates, setReversedStates] = useState<boolean[]>([]);

  // ─── Result phase ───
  const [phase, setPhase] = useState<"draw" | "result">("draw");
  const [flippedCount, setFlippedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const spread = selectedSpreadId ? TAROT_SPREADS[selectedSpreadId] : null;

  // ═══════════════════════════════════════════
  //  Step 1: Category → Describe → Validation
  // ═══════════════════════════════════════════
  const handleCategorySelect = useCallback((catId: Exclude<CategoryId, "custom">) => {
    setSelectedCategory(catId);
    setSituationDesc("");
    setStep("describe");
  }, []);

  const handleCustomTopicSubmit = useCallback(() => {
    if (!customTopic.trim()) return;
    const q = customTopic.trim();
    setSelectedCategory("custom");
    setQuestion(q);
    setStep("validation");
    drawValidationCards(q);
  }, [customTopic]);

  const handleDescribeNext = useCallback(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    const label = cat ? t(cat.labelKey) : "";
    const q = situationDesc.trim() ? `${label} — ${situationDesc.trim()}` : label;
    setQuestion(q);
    setStep("validation");
    drawValidationCards(q);
  }, [selectedCategory, situationDesc, t]);

  const handleDescribeSkip = useCallback(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    const label = cat ? t(cat.labelKey) : "";
    setQuestion(label);
    setStep("validation");
    drawValidationCards(label);
  }, [selectedCategory, t]);

  // ═══════════════════════════════════════════
  //  Step 2: Validation cards
  // ═══════════════════════════════════════════
  const drawValidationCards = useCallback((questionText: string) => {
    const shuffled = shuffle(allTarotCards);
    const cards = shuffled.slice(0, 3).map((card) => ({
      card,
      isReversed: Math.random() < 0.5,
    }));
    setValidationCards(cards);
    setValidationText("");
    setValidationLoading(true);
    setValidationRevealed(true);
    setValidationFlipped(0);
    setValidationAttempt((prev) => prev + 1);

    // Call AI for validation reading
    fetchValidationReading(cards, questionText);
  }, []);

  const abortValidation = useRef<AbortController | null>(null);

  const fetchValidationReading = async (
    cards: { card: TarotCard; isReversed: boolean }[],
    questionText: string
  ) => {
    abortValidation.current?.abort();
    const controller = new AbortController();
    abortValidation.current = controller;

    const isZh = i18n.language.startsWith("zh");
    const cardList = cards
      .map(
        (c, i) =>
          `${i + 1}. ${c.card.name[lang]}（${c.isReversed ? (isZh ? "逆位" : "Reversed") : (isZh ? "正位" : "Upright")}）`
      )
      .join("\n");

    const userMessage = isZh
      ? `使用者的問題：${questionText || "無特定問題"}\n\n驗證牌：\n${cardList}\n\n請只描述使用者目前的狀態，3-4 句話就好。不要給建議、不要給指引、不要用任何標題或格式。用繁體中文回答。`
      : `User's question: ${questionText || "No specific question"}\n\nValidation cards:\n${cardList}\n\nDescribe only the user's current state in 3-4 sentences. No advice, no guidance, no titles or formatting. Respond in English.`;

    try {
      const resp = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deck_type: "tarot",
          validation: true,
          spread: isZh ? "驗證牌" : "Validation",
          cards: cards.map((c, i) => ({
            position: `${i + 1}`,
            nameZh: `${c.card.name.zh}（${c.isReversed ? "逆位" : "正位"}）`,
            nameEn: `${c.card.name.en} (${c.isReversed ? "Reversed" : "Upright"})`,
            meaningZh: c.isReversed ? c.card.reversed.zh : c.card.upright.zh,
            meaningEn: c.isReversed ? c.card.reversed.en : c.card.upright.en,
          })),
          locale: i18n.language,
          topic: userMessage,
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        setValidationLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) {
        setValidationLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setValidationText(fullText);
      }
      setValidationLoading(false);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setValidationLoading(false);
    }
  };

  const handleValidationMatch = useCallback(() => {
    sendGAEvent("event", "validation_complete", {
      deck_type: "tarot",
      attempt: String(validationAttempt),
    });
    setStep("spreadSelect");
  }, [validationAttempt]);

  const handleValidationRetry = useCallback(() => {
    drawValidationCards(question);
  }, [drawValidationCards, question]);

  // ═══════════════════════════════════════════
  //  Step 3: Spread selection
  // ═══════════════════════════════════════════
  const handleSpreadSelect = useCallback(
    (spreadId: string) => {
      setSelectedSpreadId(spreadId);
      setDeck(shuffle(allTarotCards));
      setDrawn([]);
      setReversedStates([]);
      setPhase("draw");
      setFlippedCount(0);
      setCopied(false);
      setStep("draw");
      sendGAEvent("event", "spread_selected", {
        deck_type: "tarot",
        spread_type: spreadId,
      });
    },
    []
  );

  const recommended = recommendSpread(question);
  const spreadOrder = ["single", "three-card", "celtic-cross", "relationship"];

  // ═══════════════════════════════════════════
  //  Step 4: Draw (fan selection)
  // ═══════════════════════════════════════════
  const handleDrawCard = useCallback(
    (idx: number) => {
      if (!spread || drawn.length >= spread.count) return;
      const card = deck[idx];
      const isReversed = Math.random() < 0.5;
      setDrawn((p) => [...p, card]);
      setReversedStates((p) => [...p, isReversed]);
      setDeck((p) => p.filter((_, i) => i !== idx));
      sendGAEvent("event", "draw_card", {
        deck_type: "tarot",
        spread_type: selectedSpreadId ?? "",
      });
    },
    [spread, drawn, deck, selectedSpreadId]
  );

  const handleDrawComplete = useCallback(() => {
    setPhase("result");
    sendGAEvent("event", "all_cards_drawn", {
      deck_type: "tarot",
      spread_type: selectedSpreadId ?? "",
    });
  }, [selectedSpreadId]);

  // Get position labels for current spread
  const getPositionLabels = useCallback((): string[] => {
    if (!spread) return [];
    return spread.positions.map((p) => p.name[lang]);
  }, [spread, lang]);

  // ═══════════════════════════════════════════
  //  Step 5: Result — custom render for tarot
  // ═══════════════════════════════════════════
  const customRenderCard = useCallback(
    (
      cardIdx: number,
      opts: { revealed: boolean; onFlipped: () => void; onRequestReveal: () => void }
    ) => {
      const card = drawn[cardIdx];
      const isReversed = reversedStates[cardIdx];
      const labels = getPositionLabels();
      const cardName = card.name[lang];

      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[11px] text-zen-gold-dim tracking-widest">
            {labels[cardIdx]}
          </div>
          <FlipCard
            card={toOshoCard(card)}
            label={labels[cardIdx]}
            delay={cardIdx * 150}
            revealed={opts.revealed}
            onFlipped={opts.onFlipped}
            onRequestReveal={opts.onRequestReveal}
            reversed={isReversed}
            customFace={<TarotCardFace card={card} reversed={isReversed} />}
            customName={`${cardName}${isReversed ? (lang === "zh" ? "（逆位）" : " (Reversed)") : ""}`}
          />
          <div
            className="text-xs text-white/70 mt-1 transition-opacity duration-300"
            style={{ opacity: opts.revealed ? 1 : 0, minHeight: "1.25rem" }}
          >
            {cardName}
          </div>
          <div
            className="transition-opacity duration-300"
            style={{ opacity: opts.revealed ? 1 : 0 }}
          >
            <span
              className={`text-[10px] tracking-wider ${
                isReversed ? "text-purple-400/70" : "text-zen-gold/70"
              }`}
            >
              {isReversed
                ? `${t("tarot.reversed")} ▼`
                : `${t("tarot.upright")} ▲`}
            </span>
          </div>
        </div>
      );
    },
    [drawn, reversedStates, lang, t, getPositionLabels]
  );

  const buildApiBody = useCallback((): Record<string, unknown> => {
    if (!spread) return {};
    const labels = getPositionLabels();
    const profile = getUserProfile();
    const isZh = i18n.language.startsWith("zh");

    // Build validation context if available
    let valCtx: string | undefined;
    if (validationCards.length > 0 && validationText) {
      const valCardList = validationCards
        .map((vc) => {
          const name = vc.card.name[lang];
          const dir = vc.isReversed
            ? (isZh ? "逆位" : "Reversed")
            : (isZh ? "正位" : "Upright");
          return `${name}（${dir}）`;
        })
        .join("、");

      valCtx = isZh
        ? `【使用者當前狀態（由驗證牌確認）】\n驗證牌：${valCardList}\nAI 驗證描述：${validationText}\n使用者已確認此描述符合其當前狀態。\n\n請根據使用者已確認的當前狀態，結合正式牌陣的每張牌，給出完整的解讀。\n解讀要建立在驗證牌所揭示的狀態基礎上，讓正式解讀更加個人化和精準。\n請在解讀中包含時間預測的分析。`
        : `[User's Current State (confirmed by validation cards)]\nValidation cards: ${valCardList}\nAI validation description: ${validationText}\nThe user has confirmed this description matches their current state.\n\nPlease base the full reading on the user's confirmed current state, combining it with the formal spread cards for a more personalized and precise interpretation.\nInclude time prediction analysis in the reading.`;
    }

    return {
      deck_type: "tarot",
      spread: spread.name[lang],
      spreadId: selectedSpreadId,
      cards: drawn.map((c, i) => ({
        position: `${i + 1} - ${labels[i]}`,
        nameZh: `${c.name.zh}${reversedStates[i] ? "（逆位）" : "（正位）"}`,
        nameEn: `${c.name.en} (${reversedStates[i] ? "Reversed" : "Upright"})`,
        meaningZh: reversedStates[i] ? c.reversed.zh : c.upright.zh,
        meaningEn: reversedStates[i] ? c.reversed.en : c.upright.en,
      })),
      locale: i18n.language,
      ...(profile && { userProfile: profile }),
      topic: question || t("tarot.noQuestion"),
      ...(valCtx && { validationContext: valCtx }),
    };
  }, [spread, drawn, reversedStates, lang, selectedSpreadId, i18n.language, question, t, getPositionLabels, validationCards, validationText]);

  const handleCopyPrompt = useCallback(() => {
    if (!spread) return;
    const labels = getPositionLabels();
    const lines = drawn.map(
      (c, i) =>
        `${labels[i]}：${c.name[lang]}（${reversedStates[i] ? (lang === "zh" ? "逆位" : "Reversed") : (lang === "zh" ? "正位" : "Upright")}）`
    );
    const text = `${spread.name[lang]}\n${lines.join("\n")}\n\n${lang === "zh" ? "問題" : "Question"}: ${question}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [spread, drawn, reversedStates, lang, question, getPositionLabels]);

  const handleReset = useCallback(() => {
    setStep("category");
    setQuestion("");
    setSelectedCategory(null);
    setShowCustom(false);
    setCustomTopic("");
    setSituationDesc("");
    setSelectedSpreadId(null);
    setDeck([]);
    setDrawn([]);
    setReversedStates([]);
    setPhase("draw");
    setFlippedCount(0);
    setCopied(false);
    setValidationCards([]);
    setValidationText("");
    setValidationAttempt(0);
  }, []);

  // ═══════════════════════════════════════════
  //  Render
  // ═══════════════════════════════════════════
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-8">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          🃏 CLASSIC TAROT 🃏
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {step === "result"
            ? (lang === "zh" ? "解讀" : "Reading")
            : (lang === "zh" ? "塔羅占卜" : "Tarot Reading")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* ═══ Step 1a: Category ═══ */}
      {step === "category" && (
        <div className="animate-fadeUp max-w-[500px] w-full">
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

            {/* Custom Topic */}
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
      )}

      {/* ═══ Step 1b: Describe ═══ */}
      {step === "describe" && (
        <div className="animate-fadeUp max-w-[500px] w-full">
          <button
            onClick={() => { setStep("category"); setSelectedCategory(null); }}
            className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                       transition-colors duration-200"
          >
            ← {t("guide.backToLanding")}
          </button>

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
              placeholder={t(
                selectedCategory && selectedCategory !== "custom"
                  ? DESCRIBE_PLACEHOLDER_KEYS[selectedCategory]
                  : "guide.describePlaceholderDaily"
              )}
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

      {/* ═══ Step 2: Validation ═══ */}
      {step === "validation" && (
        <div className="animate-fadeUp w-full max-w-xl flex flex-col items-center">
          {/* Question display */}
          {question && (
            <div className="mb-4 text-center">
              <p className="text-white/35 text-xs tracking-wider mb-1">Q</p>
              <p className="text-white/60 text-sm italic max-w-md">
                &ldquo;{question}&rdquo;
              </p>
            </div>
          )}

          <p className="text-white/50 text-xs tracking-wider mb-4">
            {lang === "zh"
              ? "── 讓我們先確認你目前的狀態 ──"
              : "── Let's first confirm your current state ──"}
          </p>

          {/* 3 validation cards */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-6">
            {validationCards.map((vc, idx) => (
              <div key={`${vc.card.id}-${validationAttempt}`} className="flex flex-col items-center">
                <FlipCard
                  card={toOshoCard(vc.card)}
                  delay={idx * 300}
                  revealed={validationRevealed}
                  onFlipped={() => setValidationFlipped((p) => p + 1)}
                  reversed={vc.isReversed}
                  customFace={<TarotCardFace card={vc.card} reversed={vc.isReversed} />}
                  customName={vc.card.name[lang]}
                />
                <div
                  className="text-center mt-1.5 transition-opacity duration-300"
                  style={{ opacity: validationFlipped > idx ? 1 : 0 }}
                >
                  <div className="text-xs text-white/70">{vc.card.name[lang]}</div>
                  <div
                    className={`text-[10px] tracking-wider mt-0.5 ${
                      vc.isReversed ? "text-purple-400/70" : "text-zen-gold/70"
                    }`}
                  >
                    {vc.isReversed
                      ? `${t("tarot.reversed")} ▼`
                      : `${t("tarot.upright")} ▲`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI validation text */}
          {validationLoading && !validationText && (
            <div className="w-full max-w-md">
              <div className="rounded-xl border border-zen-gold/15 bg-white/[0.02] p-5 md:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zen-gold/70">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-zen-gold/85 text-sm font-semibold tracking-wide animate-pulse">
                    {lang === "zh" ? "感應中…" : "Sensing…"}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-3.5 bg-white/[0.06] rounded animate-pulse"
                      style={{ width: `${70 + i * 10}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {validationText && (
            <div className="w-full max-w-md mb-6 animate-fadeUp">
              <div className="rounded-xl border border-zen-gold/25 bg-gradient-to-b from-zen-gold/[0.04] to-transparent p-5 md:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zen-gold/70">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-zen-gold/85 text-sm font-semibold tracking-wide">
                    {lang === "zh" ? "你目前的狀態" : "Your Current State"}
                  </span>
                </div>
                <div className="text-white/80 text-sm leading-[1.9] whitespace-pre-line">
                  {validationText}
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {validationText && !validationLoading && (
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <button
                onClick={handleValidationMatch}
                className="px-7 py-3 rounded-full border border-zen-gold/35
                           bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                           text-zen-gold/90 text-sm tracking-[1px]
                           hover:border-zen-gold/60 hover:scale-[1.02]
                           transition-all duration-300"
              >
                {lang === "zh" ? "符合我的狀態，繼續 ✅" : "This matches, continue ✅"}
              </button>
              <button
                onClick={handleValidationRetry}
                className="px-7 py-3 rounded-full border border-white/15
                           bg-white/[0.03] text-white/60 text-sm tracking-[1px]
                           hover:bg-white/[0.08] hover:text-white/80
                           transition-all duration-300"
              >
                {lang === "zh" ? "不太符合，重新抽 🔄" : "Doesn't match, try again 🔄"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ Step 3: Spread Selection ═══ */}
      {step === "spreadSelect" && (
        <div className="animate-fadeUp w-full max-w-2xl">
          <p className="text-center text-white/50 text-sm tracking-wider mb-8">
            {lang === "zh"
              ? "選擇最適合你問題的牌陣"
              : "Choose the best spread for your question"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spreadOrder.map((sid) => {
              const sp = TAROT_SPREADS[sid];
              const detail = TAROT_SPREAD_DETAILS.find((d) => d.slug === sid);
              const isRecommended = recommended === sid;
              return (
                <button
                  key={sid}
                  onClick={() => handleSpreadSelect(sid)}
                  className="group relative p-5 rounded-xl text-left
                             border border-white/5 hover:border-zen-gold/30
                             bg-white/[0.02] hover:bg-zen-gold/[0.05]
                             transition-all duration-300"
                >
                  {isRecommended && (
                    <span className="absolute -top-2 right-3 px-2 py-0.5 text-[10px] tracking-wider
                                     bg-zen-gold/20 border border-zen-gold/30 rounded-full text-zen-gold/90">
                      {lang === "zh" ? "推薦 ✨" : "Recommended ✨"}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-white/85 text-sm group-hover:text-zen-gold/90 transition-colors font-light tracking-wider">
                        {sp.name[lang]}
                      </div>
                      <div className="text-white/35 text-xs mt-0.5">{sp.name[lang === "zh" ? "en" : "zh"]}</div>
                      {detail && (
                        <div className="text-white/45 text-xs mt-2 leading-relaxed">
                          {detail.desc[lang]}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <span className="text-xl text-zen-gold/60 font-light">{sp.count}</span>
                      <span className="text-white/30 text-[10px]">{lang === "zh" ? "張" : "cards"}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ Step 4: Draw (fan) ═══ */}
      {step === "draw" && spread && phase === "draw" && (
        <DrawPhase
          spread={{ id: selectedSpreadId!, count: spread.count }}
          deck={deck}
          drawn={drawn}
          onDrawCard={handleDrawCard}
          onComplete={handleDrawComplete}
          positionLabels={getPositionLabels()}
          spreadDisplayName={spread.name[lang]}
        />
      )}

      {/* ═══ Step 5: Result ═══ */}
      {step === "draw" && spread && phase === "result" && (
        <ResultPhase
          spread={{ id: selectedSpreadId!, count: spread.count, name: spread.name.zh, nameEn: spread.name.en }}
          drawn={drawn.map(toOshoCard)}
          flippedCount={flippedCount}
          copied={copied}
          topic={question}
          onFlipped={() => setFlippedCount((p) => p + 1)}
          onCopyPrompt={handleCopyPrompt}
          onReset={handleReset}
          positionLabels={getPositionLabels()}
          customRenderCard={customRenderCard}
          buildApiBody={buildApiBody}
          customCardNames={drawn.map((c) => c.name[lang])}
          customLayout={TAROT_LAYOUTS[selectedSpreadId!]}
        />
      )}
    </div>
  );
}
