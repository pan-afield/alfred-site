"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSettingStore } from '@/store/settingStore';

export const AmbientGlow = () => {
    const glowRef = useRef<HTMLDivElement>(null);
    const theme = useSettingStore((state) => state.theme);

    // 主题变化时调整光晕效果
    useEffect(() => {
        if (!glowRef.current) return;

        // 暗黑模式下光晕更朦胧，亮色模式下光晕更紧致
        const targetOpacity = theme === 'dark' ? 0.2 : 0.15;
        gsap.to(glowRef.current, {
            scale: theme === 'dark' ? 1.2 : 0.8,
            opacity: targetOpacity,
            duration: 1,
            ease: "back.out(1.7)"
        });

        // 同时更新内联样式，确保初始状态正确
        glowRef.current.style.opacity = targetOpacity.toString();
    }, [theme]);

    // 鼠标移动跟踪
    useEffect(() => {
        if (!glowRef.current) return;

        // 初始化位置到屏幕中心，确保一开始就可见
        const initialX = window.innerWidth / 2 - 300;
        const initialY = window.innerHeight / 2 - 300;
        gsap.set(glowRef.current, {
            x: initialX,
            y: initialY,
        });


        const moveGlow = (e: MouseEvent) => {
            if (!glowRef.current) return;
            gsap.to(glowRef.current, {
                x: e.clientX - 300,
                y: e.clientY - 300,
                duration: 1.2, // 增加一点点延迟感，更有"雾"的感觉
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
            // 注意：不使用 Tailwind 的 translate 类，因为 GSAP 会直接控制 transform
            className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] z-0"
            style={{
                background: `radial-gradient(circle, var(--color-primary-gold) 0%, transparent 70%)`,
                opacity: theme === 'dark' ? 0.2 : 0.15, // 初始 opacity，会被 GSAP 更新
                filter: 'blur(80px)',
                mixBlendMode: 'soft-light',
                willChange: 'transform',
            }}
        />
    );
};
