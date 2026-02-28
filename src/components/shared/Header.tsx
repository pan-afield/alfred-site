"use client";
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

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
                <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm"
                    onClick={() => window.open('https://github.com/pan-afield', '_blank')}>GH</div>
                {/* <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm">X</div> */}
            </div>
        </motion.header>
    );
}