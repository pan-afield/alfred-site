'use client';
import { BaseCard } from './BaseCard';

interface MusicCardProps {
  path?: string;
  ariaLabel?: string;
  coverImage?: string | null;
}

export const MusicCard = ({ path, ariaLabel, coverImage }: MusicCardProps) => (
  <BaseCard
    className="md:col-span-1 md:row-span-2 overflow-hidden"
    path={path}
    ariaLabel={ariaLabel}
  >
    <div className="relative flex flex-col justify-center gap-4 h-full p-5">
      {/* 背景：第一条音乐的封面 */}
      {coverImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </>
      )}
      <div className="relative z-10 flex flex-col justify-center gap-4 h-full">
        <div className="flex items-center gap-1">
          <div className="w-1 h-4 bg-green-500 animate-bounce" />
          <div className="w-1 h-7 bg-green-500 animate-bounce [animation-delay:0.2s]" />
          <div className="w-1 h-3 bg-green-500 animate-bounce [animation-delay:0.4s]" />
        </div>
        <p className="text-sm font-medium text-text-main">Currently Listening</p>
      </div>
    </div>
  </BaseCard>
);
