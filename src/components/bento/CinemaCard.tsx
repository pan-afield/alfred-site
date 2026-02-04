"use client";
import { useEffect, useMemo, useRef } from 'react';
import { BaseCard } from './BaseCard';
import gsap from 'gsap';

interface Movie {
  title: string;
  year: string;
  accentColor: string; // 使用 accentColor 而不是 accent
  poster?: string; // 海报图片 URL
}

interface CinemaCardProps {
  path?: string;
  ariaLabel?: string;
  initialData: Movie[]; // 接收从服务端传来的电影数据
}

export const CinemaCard = ({ path, ariaLabel, initialData }: CinemaCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // 使用 useMemo 缓存 displayMovies，避免每次渲染都重新计算
  const displayMovies = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    return initialData.slice(0, 5);
  }, [initialData]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || displayMovies.length === 0) return;

    // 清理之前的动画
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const items = gsap.utils.toArray<HTMLElement>(scrollContainer.children);
    if (items.length === 0) return;

    // GSAP 无缝滚动逻辑
    tweenRef.current = gsap.to(items, {
      xPercent: -100 * displayMovies.length,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [displayMovies]);

  return (
    <BaseCard
      className="md:col-span-2 md:row-span-1 overflow-hidden p-0"
      path={path}
      ariaLabel={ariaLabel}
    >
      {/* 1. 稍微减小外层容器的内边距，从 p-6 改为 p-5 */}
      <div className="relative h-full w-full p-5 flex flex-col justify-between">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-main tracking-tight">Cinema Archives</h2>
          <span className="text-[9px] text-text-dim tracking-[0.2em] uppercase opacity-60">Selection</span>
        </div>

        {/* 2. 这里的 mt-4 保持或改为 mt-2，给滚动区域留出更多空间 */}
        <div className="relative mt-3 overflow-hidden mask-fade-edges">
          <div ref={scrollRef} className="flex gap-3 w-max py-2">
            {[...displayMovies, ...displayMovies].map((movie, index) => (
              <div
                key={index}
                /* 3. 核心修改：w-28 h-36，让比例更像竖版电影海报，且总高度可控 */
                className="relative w-28 h-36 shrink-0 rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  borderColor: movie.accentColor,
                  backgroundImage: movie.poster ? `url(${movie.poster})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* 海报背景遮罩层，确保文字可读性 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* 装饰性背景文字：缩小字号 */}
                <span className="absolute top-1 right-2 text-3xl font-black text-white/20 select-none z-0">
                  {movie.year.slice(-2)}
                </span>

                <div className="relative z-10 p-3 flex flex-col justify-between h-full">
                  <div>
                    {/* 装饰条变细 */}
                    <div className="w-4 h-0.5 bg-primary-gold mb-2" />
                    <h3 className="text-[11px] font-bold text-white leading-tight tracking-tight uppercase wrap-break-word drop-shadow-lg">
                      {movie.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[9px] text-white/80 font-mono tracking-widest uppercase drop-shadow-md">
                      {movie.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};