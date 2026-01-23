'use client';
import { BaseCard } from './BaseCard';

export const GamesCard = () => (
  <BaseCard className="md:col-span-2 md:row-span-1">
    <div className="flex flex-col justify-between h-full">
      <span className="text-3xl">🎮</span>
      <div>
        <h2 className="text-xl font-bold text-text-main">Games</h2>
        <p className="text-xs text-text-dim uppercase mt-1">Lvl. 99 Player</p>
      </div>
    </div>
  </BaseCard>
);
