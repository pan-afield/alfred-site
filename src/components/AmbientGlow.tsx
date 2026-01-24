"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSettingStore } from '@/store/settingStore';

export const AmbientGlow = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    const theme = useSettingStore((state) => state.theme);

    useEffect(() => {
        if (!glowRef.current) return;

        // 暗黑模式下光晕更朦胧，亮色模式下光晕更紧致
        gsap.to(glowRef.current, {
            scale: theme === 'dark' ? 1.2 : 0.8,
            opacity: theme === 'dark' ? 0.15 : 0.1,
            duration: 1,
            ease: "back.out(1.7)"
        });
    }, [theme]);

    useEffect(() => {
        const moveGlow = (e: MouseEvent) => {
            if (!glowRef.current) return;
            gsap.to(glowRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 1.2, // 增加一点点延迟感，更有“雾”的感觉
                ease: "power2.out",
            });
        };

        window.addEventListener('mousemove', moveGlow);
        return () => window.removeEventListener('mousemove', moveGlow);
    }, []);

    return (
        <div
            ref={glowRef}
            // 关键点：使用 fixed 定位，并确保 pointer-events-none 防止干扰
            className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-0"
            style={{
                background: `radial-gradient(circle, var(--color-primary-gold) 0%, transparent 70%)`,
                opacity: 0.15,
                filter: 'blur(80px)',
                mixBlendMode: 'soft-light',
                willChange: 'transform', // 性能优化，告诉浏览器这东西会动
            }}
        />
    );
};