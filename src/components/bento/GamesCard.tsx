'use client';
import { BaseCard } from './BaseCard';

interface GamesCardProps {
  path?: string;
  ariaLabel?: string;
  coverImage?: string | null;
}

export const GamesCard = ({ path, ariaLabel, coverImage }: GamesCardProps) => (
  <BaseCard
    className="md:col-span-2 md:row-span-1 overflow-hidden group"
    path={path}
    ariaLabel={ariaLabel}
  >
    <div className="relative flex flex-col justify-between h-full p-5">
      {/* 背景：-inset-8 铺满整卡；移入时缩放（与 LifeCard 一致） */}
      {coverImage && (
        <>
          <div
            className="absolute -inset-8 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <div className="absolute -inset-8 bg-linear-to-t from-black/90 via-black/50 to-black/30" />
        </>
      )}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <span className="absolute top-0 right-0 text-3xl opacity-80 select-none">
          🎮
        </span>
        <div className="flex items-start justify-between">
          <div className="opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <span className="badge-base bg-primary-gold/20 text-primary-gold border-primary-gold/30 backdrop-blur-md w-fit">
              Arcade
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-main">Games</h2>
          <p className="text-xs text-text-dim uppercase mt-1">Lvl. 99 Player</p>
        </div>
      </div>
    </div>
  </BaseCard>
);
