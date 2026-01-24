'use client';
import { BaseCard } from './BaseCard';

interface CookingCardProps {
  path?: string;
  ariaLabel?: string;
}

export const CookingCard = ({ path, ariaLabel }: CookingCardProps) => (
  <BaseCard
    className="md:col-span-2 md:row-span-1"
    path={path}
    ariaLabel={ariaLabel}
  >
    <div className="flex justify-between items-center h-full">
      <div>
        <span className="badge-base bg-orange-500/10 text-orange-500 border-orange-500/20">Chef Mode</span>
        <h2 className="text-2xl font-bold mt-2 text-text-main">深夜食堂</h2>
        <p className="text-sm text-text-dim">最近拿手菜：低温慢煮牛排</p>
      </div>
      <div className="text-5xl group-hover:rotate-12 transition-transform">🍳</div>
    </div>
  </BaseCard>
);