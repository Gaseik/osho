import { Spread, SPREADS } from "../data/spreads";

interface SpreadSelectorProps {
  onSelectSpread: (spread: Spread) => void;
}

export default function SpreadSelector({ onSelectSpread }: SpreadSelectorProps) {
  return (
    <div className="animate-fadeUp max-w-[500px] w-full">
      <p className="text-center text-white/60 text-sm mb-6">
        選擇你的牌陣
      </p>
      <div className="flex flex-col gap-3">
        {SPREADS.map(s => (
          <div
            key={s.id}
            onClick={() => onSelectSpread(s)}
            className="p-5 px-6 rounded-xl cursor-pointer bg-white/[0.03] border border-zen-gold/15
                     transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/40"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">{s.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.nameEn}</div>
              </div>
              <div className="text-xs text-zen-gold-dim">{s.count} 張</div>
            </div>
            <div className="text-[13px] text-white/50 mt-2">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
