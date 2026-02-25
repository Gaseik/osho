"use client";

import { useRef, useEffect, useState, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import {
  parseReading,
  extractBlockquote,
  parseBulletList,
  parseNumberedList,
  type ReadingSection,
} from "../utils/parseReading";
import MarkdownReading from "./MarkdownReading";

/* ── Inline bold-highlight renderer ── */
function InlineText({ text }: { text: string }) {
  // Split on **bold** markers and render bold spans with gold highlight
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const inner = part.slice(2, -2);
          return (
            <strong
              key={i}
              className="text-zen-gold/90 font-semibold"
              style={{ textShadow: "0 0 12px rgba(255,215,0,0.15)" }}
            >
              {inner}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/* ── Section wrapper with Intersection Observer fade-in ── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reading-section ${visible ? "reading-section--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Section divider ── */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6 md:my-8">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-zen-gold/20" />
      <div className="w-1 h-1 rounded-full bg-zen-gold/30" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-zen-gold/20" />
    </div>
  );
}

/* ── SVG Icons ── */
function CrystalBallIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zen-gold/70"
    >
      <circle cx="12" cy="11" r="8" />
      <path d="M12 3a5.5 5.5 0 0 0-4 1.7" opacity="0.5" />
      <path d="M5 19h14" />
      <path d="M7 19a2 2 0 0 1-1-1.73" />
      <path d="M17 19a2 2 0 0 0 1-1.73" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zen-gold/70"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zen-gold/70"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zen-gold/50"
    >
      <path d="M12 20c0 0-6-4.5-6-10a6 6 0 0 1 12 0c0 5.5-6 10-6 10Z" opacity="0.4" />
      <path d="M12 20c0 0-3-3-3-7a3 3 0 0 1 6 0c0 4-3 7-3 7Z" />
    </svg>
  );
}

/* ── 1. Card Reading Section ── */
function CardReadingSection({ section }: { section: ReadingSection }) {
  return (
    <AnimatedSection>
      <div className="rounded-xl border border-zen-gold/15 bg-white/[0.02] p-5 md:p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <CrystalBallIcon />
          <h2 className="text-zen-gold/85 text-base md:text-lg font-semibold tracking-wide">
            {section.title}
          </h2>
        </div>
        <div className="text-white/80 text-sm leading-[1.9] reading-body">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0">{children}</p>
              ),
              strong: ({ children }) => (
                <strong
                  className="reading-highlight font-semibold"
                >
                  {children}
                </strong>
              ),
              h3: ({ children }) => (
                <h3 className="text-zen-gold/70 text-[0.95rem] font-medium mt-4 mb-2">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="pl-5 mb-3">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="pl-5 mb-3 list-decimal">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-white/75 leading-[1.8] mb-1">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-zen-gold/30 pl-4 text-white/60 italic my-3">
                  {children}
                </blockquote>
              ),
            }}
          >
            {section.body}
          </ReactMarkdown>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── 2. Deeper Insight Section ── */
function DeeperInsightSection({ section }: { section: ReadingSection }) {
  const items = parseBulletList(section.body);
  // If parsing didn't find bullet items, fall back to paragraph rendering
  const hasBullets = items.length > 0;

  return (
    <AnimatedSection delay={100}>
      <div className="rounded-xl border border-zen-gold/25 bg-gradient-to-b from-zen-gold/[0.04] to-transparent p-5 md:p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <EyeIcon />
          <h2 className="text-zen-gold/90 text-base md:text-lg font-semibold tracking-wide">
            {section.title}
          </h2>
        </div>

        {hasBullets ? (
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="insight-card rounded-lg border border-zen-gold/10
                           bg-white/[0.03] p-4 transition-colors duration-300
                           hover:border-zen-gold/20 hover:bg-white/[0.05]"
              >
                <div className="flex gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-zen-gold/10 border border-zen-gold/20
                                   flex items-center justify-center text-[10px] text-zen-gold/70 font-medium">
                    {i + 1}
                  </span>
                  <p className="text-white/80 text-sm leading-[1.8] flex-1">
                    <InlineText text={item} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white/80 text-sm leading-[1.8]">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                strong: ({ children }) => (
                  <strong className="reading-highlight font-semibold">{children}</strong>
                ),
                ul: ({ children }) => <ul className="pl-5 mb-3">{children}</ul>,
                li: ({ children }) => <li className="text-white/75 leading-[1.8] mb-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-zen-gold/30 pl-4 text-white/60 italic my-3">{children}</blockquote>
                ),
              }}
            >
              {section.body}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

/* ── 3. Practical Guidance Section ── */
function PracticalGuidanceSection({ section }: { section: ReadingSection }) {
  const steps = parseNumberedList(section.body);
  const hasSteps = steps.length > 0;

  return (
    <AnimatedSection delay={200}>
      <div className="rounded-xl border border-zen-gold/15 bg-white/[0.02] p-5 md:p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <CompassIcon />
          <h2 className="text-zen-gold/85 text-base md:text-lg font-semibold tracking-wide">
            {section.title}
          </h2>
        </div>

        {hasSteps ? (
          <div className="relative pl-8 md:pl-10">
            {/* Connecting vertical line */}
            <div
              className="absolute left-[11px] md:left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-zen-gold/20 via-zen-gold/10 to-transparent"
            />

            <div className="flex flex-col gap-5">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Number circle */}
                  <div
                    className="step-circle absolute -left-8 md:-left-10 top-0
                               w-[22px] h-[22px] md:w-[26px] md:h-[26px]
                               rounded-full border border-zen-gold/30 bg-zen-dark
                               flex items-center justify-center
                               text-[10px] md:text-xs text-zen-gold/80 font-medium"
                  >
                    {i + 1}
                  </div>
                  <p className="text-white/80 text-sm leading-[1.8] pt-0.5">
                    <InlineText text={step} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white/80 text-sm leading-[1.8]">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                strong: ({ children }) => (
                  <strong className="reading-highlight font-semibold">{children}</strong>
                ),
                ol: ({ children }) => <ol className="pl-5 mb-3 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="text-white/75 leading-[1.8] mb-1">{children}</li>,
              }}
            >
              {section.body}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

/* ── 4. Zen Reminder Section ── */
function ZenReminderSection({ section }: { section: ReadingSection }) {
  const quote = extractBlockquote(section.body);

  return (
    <AnimatedSection delay={300} className="zen-reminder-section">
      <div className="rounded-xl border border-zen-gold/10 bg-gradient-to-b from-zen-gold/[0.03] via-zen-darker to-zen-dark p-6 md:p-8">
        {/* Top decorative line */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-zen-gold/25" />
          <LotusIcon />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-zen-gold/25" />
        </div>

        <p className="zen-reminder-text text-center text-white/70 text-base md:text-lg leading-relaxed italic font-serif">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <div className="w-1 h-1 rounded-full bg-zen-gold/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-zen-gold/30" />
          <div className="w-1 h-1 rounded-full bg-zen-gold/20" />
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Section renderer by id ── */
function renderSection(section: ReadingSection) {
  switch (section.id) {
    case "card-reading":
      return <CardReadingSection key={section.id} section={section} />;
    case "deeper-insight":
      return <DeeperInsightSection key={section.id} section={section} />;
    case "practical-guidance":
      return <PracticalGuidanceSection key={section.id} section={section} />;
    case "zen-reminder":
      return <ZenReminderSection key={section.id} section={section} />;
    default:
      return null;
  }
}

/* ── Main component ── */
interface StructuredReadingProps {
  content: string;
}

export default function StructuredReading({ content }: StructuredReadingProps) {
  const sections = parseReading(content);

  // Fallback: if parsing found fewer than 2 sections, render with MarkdownReading
  if (sections.length < 2) {
    return <MarkdownReading content={content} />;
  }

  return (
    <div className="structured-reading flex flex-col">
      {sections.map((section, i) => (
        <Fragment key={section.id}>
          {i > 0 && <SectionDivider />}
          {renderSection(section)}
        </Fragment>
      ))}
    </div>
  );
}
