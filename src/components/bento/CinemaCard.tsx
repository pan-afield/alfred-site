'use client';
import { BaseCard } from './BaseCard';

export const CinemaCard = () => (
  <BaseCard className="md:col-span-2 md:row-span-1 overflow-hidden">
    <h2 className="text-xl font-bold mb-4 text-text-main">Cinema Archives</h2>
    <div className="flex gap-4 opacity-40">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="min-w-[120px] h-32 bg-text-main/5 rounded-xl border border-card-border" />
      ))}
    </div>
  </BaseCard>
);
