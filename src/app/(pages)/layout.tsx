// src/app/(pages)/layout.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubPagesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // 获取当前路径
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* 共享导航 */}
            <nav className="fixed top-0 left-0 w-full z-[100] p-8 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="group flex items-center gap-2 text-main font-medium">
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                    <span>Index</span>
                </Link>
                <div className="text-xs tracking-widest opacity-30">ALFRED / 2024</div>
            </nav>

            {/* 统一的页面入场动效容器 */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="container mx-auto pt-32 px-6 pb-20"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            {/* 延续首页的环境光（可以调低亮度，作为背景点缀） */}
            <div className="fixed inset-0 z-[-1] opacity-30 blur-[120px] bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
        </div>
    );
}