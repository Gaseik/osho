"use client";

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { SPREADS } from "../data/spreads";

export default function SpreadSelector() {
  const { t } = useTranslation();

  return (
    <div className="animate-fadeUp max-w-[500px] w-full">
      <p className="text-center text-white/60 text-sm mb-6">
        {t('spread.selectTitle')}
      </p>
      <div className="flex flex-col gap-3">
        {SPREADS.map(s => (
          <Link
            key={s.id}
            href={`/reading/${s.id}`}
            className="p-5 px-6 rounded-xl bg-white/[0.03] border border-zen-gold/15
                     transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/40
                     no-underline"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium text-white">{t(`spread.${s.id}`)}</div>
              </div>
              <div className="text-xs text-zen-gold-dim">{s.count}{t('spread.cards')}</div>
            </div>
            <div className="text-[13px] text-white/50 mt-2">{t(`spread.${s.id}Desc`)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
