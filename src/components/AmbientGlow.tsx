"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AmbientGlow = () => {
    const glowRef = useRef<HTMLDivElement>(null);

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
            /* 关键修改：z-50 确保在最顶层，pointer-events-none 确保不阻挡点击 */
            className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-[99]"
            style={{
                background: `radial-gradient(circle, var(--color-primary-gold) 0%, transparent 70%)`,
                opacity: 0.6, // 透明度不要太高
                filter: 'blur(100px)',
                /* 关键修改：overlay 或 screen 模式能让它在深色/浅色背景上产生不同的光感 */
                mixBlendMode: 'overlay',
            }}
        />
    );
};