"use client";

import { ReactNode, forwardRef } from "react";

interface TarotSpreadLayoutProps {
  spreadId: string;
  cardCount: number;
  renderCard: (cardIdx: number) => ReactNode;
}

/**
 * Celtic Cross layout:
 *        [4]
 *  [3] [0/1] [5]
 *        [2]
 *                [9]
 *                [8]
 *                [7]
 *                [6]
 */
const CelticCrossLayout = ({ renderCard }: { renderCard: (i: number) => ReactNode }) => (
  <div className="spread-grid flex gap-6 items-start justify-center mb-8 px-2">
    {/* Left: cross */}
    <div className="flex flex-col items-center gap-3">
      {/* Row 1: card 4 (potential) */}
      <div className="flex justify-center">{renderCard(4)}</div>
      {/* Row 2: cards 3, 0+1, 5 */}
      <div className="flex items-center gap-3">
        <div>{renderCard(3)}</div>
        <div className="relative">
          {renderCard(0)}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(90deg)",
              opacity: 0.9,
            }}
          >
            {renderCard(1)}
          </div>
        </div>
        <div>{renderCard(5)}</div>
      </div>
      {/* Row 3: card 2 (foundation) */}
      <div className="flex justify-center">{renderCard(2)}</div>
    </div>

    {/* Right: staff (6-9 bottom to top) */}
    <div className="flex flex-col-reverse gap-3 ml-4">
      {[6, 7, 8, 9].map((i) => (
        <div key={i}>{renderCard(i)}</div>
      ))}
    </div>
  </div>
);

/**
 * Relationship layout:
 * [0]   [2]   [1]
 *   [3]   [4]
 *      [5]
 *      [6]
 */
const RelationshipLayout = ({ renderCard }: { renderCard: (i: number) => ReactNode }) => (
  <div className="spread-grid flex flex-col items-center gap-3 mb-8 px-2">
    {/* Row 1 */}
    <div className="flex gap-5 justify-center">
      {renderCard(0)}
      {renderCard(2)}
      {renderCard(1)}
    </div>
    {/* Row 2 */}
    <div className="flex gap-5 justify-center">
      {renderCard(3)}
      {renderCard(4)}
    </div>
    {/* Row 3 */}
    <div className="flex justify-center">{renderCard(5)}</div>
    {/* Row 4 */}
    <div className="flex justify-center">{renderCard(6)}</div>
  </div>
);

const TarotSpreadLayout = forwardRef<HTMLDivElement, TarotSpreadLayoutProps>(
  function TarotSpreadLayout({ spreadId, cardCount, renderCard }, ref) {
    if (spreadId === "celtic-cross") {
      return (
        <div ref={ref}>
          <CelticCrossLayout renderCard={renderCard} />
        </div>
      );
    }

    if (spreadId === "relationship") {
      return (
        <div ref={ref}>
          <RelationshipLayout renderCard={renderCard} />
        </div>
      );
    }

    // Default: horizontal row (single, three-card)
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

export default TarotSpreadLayout;
