"use client";
import Image from 'next/image';
import { BaseCard } from './BaseCard';
import travelImage from '@/images/life/travel.jpg';

interface TravelCardProps {
  path?: string;
  ariaLabel?: string;
}

export const TravelCard = ({ path, ariaLabel }: TravelCardProps) => (
  <BaseCard
    className="md:col-span-1 md:row-span-2 relative overflow-hidden group"
    path={path}
    ariaLabel={ariaLabel}
  >
    {/* 背景：-inset-8 铺满整卡，父级 overflow-hidden 裁剪圆角 */}
    <div className="absolute -inset-8">
      <Image
        src={travelImage}
        alt="Travel destination"
        fill
        priority
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-30 dark:opacity-40"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
    <div className="absolute -inset-8 bg-linear-to-t from-app-bg via-app-bg/30 to-transparent" />
    <div className="relative z-10 h-full flex flex-col justify-between p-6">
      <span className="badge-base bg-emerald-500/10 text-emerald-500 border-emerald-500/20 w-fit">Wanderlust</span>
      <div>
        <h2 className="text-xl font-bold text-text-main">下一站</h2>
        <p className="text-xs mt-1 tracking-widest uppercase text-primary-gold">Iceland</p>
      </div>
    </div>
  </BaseCard>
);