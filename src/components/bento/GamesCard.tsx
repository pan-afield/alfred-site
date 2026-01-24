'use client';
import { BaseCard } from './BaseCard';

interface GamesCardProps {
  path?: string;
  ariaLabel?: string;
}

export const GamesCard = ({ path, ariaLabel }: GamesCardProps) => (
  <BaseCard
    className="md:col-span-2 md:row-span-1"
    path={path}
    ariaLabel={ariaLabel}
  >
    <div className="flex flex-col justify-between h-full">
      <span className="text-3xl">🎮</span>
      <div>
        <h2 className="text-xl font-bold text-text-main">Games</h2>
        <p className="text-xs text-text-dim uppercase mt-1">Lvl. 99 Player</p>
      </div>
    </div>
  </BaseCard>
);
