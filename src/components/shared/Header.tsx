'use client';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import Respect from '../respect/Respect';

export default function Header() {
  return (
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
        <div
          className="p-[8px] gap-1.5 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm"
          onClick={() => window.open('https://github.com/pan-afield', '_blank')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.open('https://github.com/pan-afield', '_blank');
            }
          }}
          aria-label="在 GitHub 打开个人主页"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span className="text-sm font-medium">Github</span>
        </div>
        <Respect />
      </div>
    </motion.header>
  );
}
