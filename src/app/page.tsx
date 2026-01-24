"use client";

import dynamic from 'next/dynamic';
import { TechCard } from '@/components/bento/TechCard';
import { LifeCard } from '@/components/bento/LifeCard';
import { CookingCard } from '@/components/bento/CookingCard';
import { TravelCard } from '@/components/bento/TravelCard';
import { GamesCard } from '@/components/bento/GamesCard';
import { MusicCard } from '@/components/bento/MusicCard';
import { CinemaCard } from '@/components/bento/CinemaCard';
import { CarCard } from '@/components/bento/CarCard';
import { Variants, motion } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

// 使用 dynamic import 并禁用 ssr
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle').then(mod => mod.default), {
  ssr: false
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-app-bg max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">

      {/* 1. 找回来的 Header 区域 */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
      >
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full border border-primary-gold/30 text-primary-gold text-xs mb-4">
            Available for new projects
          </div>
          {/* text-text-main 确保主题切换时颜色正确 */}
          <h1 className="text-6xl font-black tracking-tighter text-text-main">
            HELLO, I&apos;M <span className="text-primary-gold">ALFRED.</span>
          </h1>
          <p className="mt-6 text-xl text-text-dim leading-relaxed">
            前端开发者 & 科技探索者。
            热爱精密的机械艺术（Cars），沉浸于虚拟世界的博弈（Games），
            也享受与猫和家人的温情时光。
          </p>
        </div>

        <div className="flex items-center gap-4 mb-2">
          {/* 主题切换开关 */}
          <ThemeToggle />
          {/* 社交链接 */}
          <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm">GH</div>
          <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm">X</div>
        </div>
      </motion.header>

      {/* 2. Bento Grid 核心展示区 */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]"
      >
        {/* 1. 技术栈 (2x2) */}
        <TechCard />

        {/* 2. 伴侣与猫 (2x2) */}
        <LifeCard />

        {/* 3. 旅游 (1x2) - 竖长块 */}
        <TravelCard />

        {/* 4. 游戏 (2x1) */}
        <GamesCard />

        {/* 5. 音乐 (1x2) */}
        <MusicCard />

        {/* 6. 影音 (2x1) */}
        <CinemaCard />

        {/* 7. 烹饪 (2x1) - 横长块 */}
        <CookingCard />

        {/* 8. 汽车 (2x1) */}
        <CarCard />
      </motion.section>

      {/* 3. Footer */}
      <footer className="mt-24 py-12 border-t border-card-border flex flex-col md:flex-row justify-between items-center text-text-dim text-sm gap-4">
        <p>© 2026 Alfred. Designed for the Future.</p>
        <div className="flex gap-6">
          <span className="hover:text-text-main cursor-pointer transition-colors">Home</span>
          <span className="hover:text-text-main cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-text-main cursor-pointer transition-colors">Contact</span>
        </div>
      </footer>
    </main>
  );
}