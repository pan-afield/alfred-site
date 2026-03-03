// src/app/(pages)/layout.tsx
"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BackLink } from "@/components/shared/BackLink";

export default function SubPagesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // 获取当前路径
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* 共享导航：详情页返回列表页，列表页返回首页 */}
            <nav className="fixed top-0 left-0 w-full z-100 p-8 flex justify-between items-center mix-blend-difference">
                <BackLink />
                <div className="text-xs tracking-widest opacity-30">ALFRED / 2024</div>
            </nav>

            {/* 统一的页面入场动效容器 */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="container mx-auto pt-8 px-6 pb-20"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            {/* 延续首页的环境光（可以调低亮度，作为背景点缀） */}
            <div className="fixed inset-0 z-[-1] opacity-30 blur-[120px] bg-linear-to-br from-amber-500/10 to-transparent pointer-events-none" />
        </div>
    );
}