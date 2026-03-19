'use client';
import { useRef } from 'react';
import { BaseCard } from './BaseCard';
import gsap from 'gsap';

interface CarCardProps {
  path?: string;
  ariaLabel?: string;
}

export const CarCard = ({ path, ariaLabel }: CarCardProps) => {
  const carIconRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    // 1. 赛车疾驰效果：先退后进，模拟弹射起步
    gsap.fromTo(
      carIconRef.current,
      { x: -100, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      },
    );

    // 2. 数值滚动效果：模拟转速表/马力上升
    const targetValue = { val: 0 };
    gsap.to(targetValue, {
      val: 518, // 911 GT3 RS 的马力
      duration: 1.5,
      ease: 'power3.out',
      onUpdate: () => {
        if (statsRef.current) {
          statsRef.current.innerText = Math.floor(targetValue.val).toString();
        }
      },
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="md:col-span-2 md:row-span-1 h-full"
    >
      <BaseCard
        className="flex items-center justify-between overflow-hidden h-full group"
        path={path}
        ariaLabel={ariaLabel}
      >
        {/* 左侧文字区 */}
        <div className="flex flex-col relative z-10">
          <div className="opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out mb-3">
            <span className="badge-base bg-red-500/20 text-red-400 border-red-500/30 backdrop-blur-md w-fit">
              Motorsport
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-text-dim uppercase tracking-[0.2em]">
              Track Mode
            </span>
          </div>
          <h2 className="text-3xl font-black italic text-text-main leading-none">
            911 GT3 RS
          </h2>
          <p className="mt-2 text-sm text-text-dim">
            <span
              ref={statsRef}
              className="font-mono text-primary-gold font-bold text-lg"
            >
              0
            </span>{' '}
            HP · 4.0L Boxer-6
          </p>
        </div>

        {/* 右侧交互图标区 */}
        <div className="relative flex items-center justify-center pr-4">
          {/* 背景装饰轨迹线 */}
          <div className="absolute right-0 w-32 h-px bg-linear-to-l from-primary-gold/50 to-transparent opacity-20" />

          <div
            ref={carIconRef}
            className="text-6xl filter drop-shadow-[0_0_15px_rgba(226,184,8,0.3)] select-none"
          >
            🏎️
          </div>
        </div>

        {/* 装饰性底层背景 */}
        <div className="absolute -bottom-6 -right-6 text-8xl font-black italic text-text-main/3 pointer-events-none select-none">
          PORSCHE
        </div>
      </BaseCard>
    </div>
  );
};
