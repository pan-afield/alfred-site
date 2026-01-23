"use client";
import Image from 'next/image';
import { BaseCard } from './BaseCard';
import catImg from '@/images/life/cat.jpg';
import avatarImage from '@/images/life/avatar-she.jpg';

export const LifeCard = () => {
  return (
    // BaseCard 带有 group + overflow-hidden，方便内部做 hover 动画且保证圆角裁剪
    <BaseCard className="md:col-span-2 md:row-span-2 p-0 border-none group overflow-hidden relative">
      {/* 圆角裁剪层：使用 isolation 创建新的层叠上下文，确保圆角不受父元素 3D 变换影响 */}
      <div 
        className="absolute inset-0 overflow-hidden isolate"
        style={{
          borderRadius: 'var(--radius-card)',
          clipPath: 'inset(0 round var(--radius-card))',
          willChange: 'clip-path',
        }}
      >
        <Image
          src={catImg}
          alt="She and the Cat"
          fill
          priority
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-40 dark:opacity-60"
          style={{ 
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-app-bg/60 to-transparent" />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">

        {/* --- 左上角内容：悬停时显示 --- */}
        <div className="opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <span className="badge-base bg-life-pink/20 text-life-pink border-life-pink/30 backdrop-blur-md">
            Moments
          </span>
        </div>

        {/* --- 底部内容：始终显示或也加动效 --- */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="relative w-8 h-8 rounded-full border-2 border-card-bg overflow-hidden bg-zinc-800">
              <Image
                src={avatarImage}
                alt="Partner"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-card-bg bg-zinc-800 flex items-center justify-center text-[10px]">
              🐾
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};