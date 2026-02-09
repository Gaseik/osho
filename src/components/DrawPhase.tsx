import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread } from "../data/spreads";
import CardBack from "./CardBack";

interface DrawPhaseProps {
  spread: Spread;
  deck: Card[];
  drawn: Card[];
  onDrawCard: (index: number) => void;
}

export default function DrawPhase({ spread, deck, drawn, onDrawCard }: DrawPhaseProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-fadeUp text-center w-full max-w-[600px]">
      <p className="text-white/60 text-sm mb-2">
        {t(`spread.${spread.id}`)} — {t('draw.title', { count: spread.count })}
      </p>
      <p className="text-zen-gold/50 text-[13px] mb-6">
        {t('draw.selected', { current: drawn.length, total: spread.count })}
      </p>
      <div className="flex flex-wrap gap-2 justify-center max-h-[500px] overflow-y-auto py-2">
        {deck.map((card, i) => (
          <div
            key={card.id}
            style={{
              animation: `slideIn 0.4s ease-out ${i * 0.03}s both`
            }}
          >
            <CardBack
              onClick={drawn.length < spread.count ? () => onDrawCard(i) : undefined}
              style={{ width: 64, height: 96, borderRadius: 8, fontSize: 16 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
