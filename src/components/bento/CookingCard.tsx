'use client';
import { BaseCard } from './BaseCard';

interface CookingCardProps {
  path?: string;
  ariaLabel?: string;
}

export const CookingCard = ({ path, ariaLabel }: CookingCardProps) => (
  <BaseCard
    className="md:col-span-2 md:row-span-1 group"
    path={path}
    ariaLabel={ariaLabel}
  >
    <div className="relative h-full flex justify-between items-center">
      <div className="absolute top-0 left-0 z-20 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <span className="badge-base bg-orange-500/20 text-orange-500 border-orange-500/30 backdrop-blur-md w-fit">
          Chef Mode
        </span>
      </div>
      <div className="h-full flex flex-col justify-center gap-2">
        <h2 className="text-2xl font-bold text-text-main">深夜食堂</h2>
        <p className="text-sm text-text-dim">最近拿手菜：低温慢煮牛排</p>
      </div>
      <div className="text-5xl group-hover:rotate-12 transition-transform">
        🍳
      </div>
    </div>
  </BaseCard>
);
