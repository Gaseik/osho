"use client";

import { ReactNode, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { SPREAD_LAYOUTS, type SpreadLayout } from "../data/spreads";

interface CardSpreadLayoutProps {
  spreadId: string;
  cardCount: number;
  renderCard: (cardIdx: number) => ReactNode;
  /** Override SPREAD_LAYOUTS lookup with a custom layout */
  customLayout?: SpreadLayout;
}

const CardSpreadLayout = forwardRef<HTMLDivElement, CardSpreadLayoutProps>(
  function CardSpreadLayout({ spreadId, cardCount, renderCard, customLayout }, ref) {
    const { t } = useTranslation();
    const layout = customLayout ?? SPREAD_LAYOUTS[spreadId];

    if (layout) {
      return (
        <div ref={ref} className="spread-grid flex flex-col items-center gap-3 mb-8 px-2">
          {layout.rows.map((row, rowIdx) => {
            if (row.type === "section") {
              return (
                <div
                  key={rowIdx}
                  className="text-zen-gold/60 text-sm tracking-widest py-3"
                >
                  {t(`spread.${spreadId}Sections.${row.key}`)}
                </div>
              );
            }

            if (row.type === "sections") {
              return (
                <div
                  key={rowIdx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                    gap: "0.5rem",
                  }}
                  className="w-full max-w-[520px]"
                >
                  {Array.from({ length: layout.cols }, (_, colIdx) => {
                    const item = row.items.find((it) => it.col === colIdx);
                    return (
                      <div
                        key={colIdx}
                        className="text-zen-gold/60 text-xs tracking-widest py-2 text-center"
                      >
                        {item
                          ? t(`spread.${spreadId}Sections.${item.key}`)
                          : ""}
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (row.type === "cards") {
              return (
                <div
                  key={rowIdx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                    gap: "0.5rem",
                  }}
                  className="w-full max-w-[520px]"
                >
                  {row.cells.map((cardIdx, colIdx) => (
                    <div key={colIdx} className="flex justify-center">
                      {cardIdx !== null ? renderCard(cardIdx) : null}
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    }

    // Default flex layout
    return (
      <div
        ref={ref}
        className="flex gap-5 justify-center flex-wrap mb-8 p-5"
      >
        {Array.from({ length: cardCount }, (_, i) => (
          <div key={i}>{renderCard(i)}</div>
        ))}
      </div>
    );
  }
);

export default CardSpreadLayout;
