'use client';
import { BaseCard } from './BaseCard';

export const MusicCard = () => (
  <BaseCard className="md:col-span-1 md:row-span-2">
    <div className="flex flex-col justify-center gap-4 h-full">
      <div className="flex items-center gap-1">
        <div className="w-1 h-4 bg-green-500 animate-bounce" />
        <div className="w-1 h-7 bg-green-500 animate-bounce [animation-delay:0.2s]" />
        <div className="w-1 h-3 bg-green-500 animate-bounce [animation-delay:0.4s]" />
      </div>
      <p className="text-sm font-medium text-text-main">Currently Listening</p>
    </div>
  </BaseCard>
);
