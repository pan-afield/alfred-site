"use client";
import { useEffect, useRef } from 'react';
import { BaseCard } from './BaseCard';
import gsap from 'gsap';

const MOVIES = [
  { title: 'Interstellar', year: '2014', accent: 'border-amber-500/30' },
  { title: 'Inception', year: '2010', accent: 'border-blue-500/30' },
  { title: 'Dune', year: '2021', accent: 'border-emerald-500/30' },
  { title: 'The Batman', year: '2022', accent: 'border-red-500/30' },
  { title: 'Tenet', year: '2020', accent: 'border-zinc-500/30' },
];

export const CinemaCard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const items = gsap.utils.toArray<HTMLElement>(scrollContainer.children);

    // GSAP 无缝滚动逻辑
    tweenRef.current = gsap.to(items, {
      xPercent: -100 * MOVIES.length,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    return () => { tweenRef.current?.kill(); };
  }, []);

  return (
    <BaseCard className="md:col-span-2 md:row-span-1 overflow-hidden p-0">
      {/* 1. 稍微减小外层容器的内边距，从 p-6 改为 p-5 */}
      <div className="relative h-full w-full p-5 flex flex-col justify-between">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-main tracking-tight">Cinema Archives</h2>
          <span className="text-[9px] text-text-dim tracking-[0.2em] uppercase opacity-60">Selection</span>
        </div>

        {/* 2. 这里的 mt-4 保持或改为 mt-2，给滚动区域留出更多空间 */}
        <div className="relative mt-3 overflow-hidden mask-fade-edges">
          <div ref={scrollRef} className="flex gap-3 w-max py-2">
            {[...MOVIES, ...MOVIES].map((movie, index) => (
              <div
                key={index}
                /* 3. 核心修改：w-28 h-36，让比例更像竖版电影海报，且总高度可控 */
                className={`relative w-28 h-36 flex-shrink-0 rounded-xl border ${movie.accent} 
                           bg-text-main/5 backdrop-blur-sm p-3 flex flex-col justify-between
                           transition-all duration-300 hover:bg-text-main/10 hover:-translate-y-1`}
              >
                {/* 装饰性背景文字：缩小字号 */}
                <span className="absolute top-1 right-2 text-3xl font-black text-text-main/[0.03] select-none">
                  {movie.year.slice(-2)}
                </span>

                <div className="relative z-10">
                  {/* 装饰条变细 */}
                  <div className="w-4 h-0.5 bg-primary-gold mb-2" />
                  <h3 className="text-[11px] font-bold text-text-main leading-tight tracking-tight uppercase break-words">
                    {movie.title}
                  </h3>
                </div>

                <div className="relative z-10">
                  <p className="text-[9px] text-text-dim font-mono tracking-widest uppercase">
                    {movie.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};