"use client";
import Image from 'next/image'; // 引入 Next.js 优化组件
import { BaseCard } from './BaseCard';
import catImage from '@/images/life/cat.jpg';
import avatarImage from '@/images/life/avatar-she.jpg';

export const LifeCard = () => {
  return (
    <BaseCard className="md:col-span-2 md:row-span-2 p-0 border-none group overflow-hidden">
      {/* 使用 Next.js Image 替代 background-image */}
      <Image
        src={catImage}
        alt="She and the Cat"
        fill // 填充整个父容器
        priority // 首页重要图片，优先加载
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 dark:opacity-60"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* 遮罩层保持不变 */}
      <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-app-bg/40 to-transparent" />

      {/* 内容层 */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end">
        <div>
          <span className="badge-base bg-life-pink/20 text-life-pink border-life-pink/30 w-fit backdrop-blur-md">
            Moments
          </span>
          <h2 className="text-4xl font-extrabold text-text-main mt-3">She & The Cat</h2>
          <p className="text-text-dim mt-3 max-w-[240px]">在这里，代码让位于生活。</p>
        </div>

        {/* 头像部分也进行优化 */}
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