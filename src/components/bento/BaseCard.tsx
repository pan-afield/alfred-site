'use client';

import React, { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Variants, motion } from 'framer-motion';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  path?: string;
  ariaLabel?: string;
}

// 定义单个卡片的动画效果
export const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" // 现在 TS 能够识别这个特定的字符串了
    }
  }
};

export const BaseCard = ({ children, className = "", path, ariaLabel }: BaseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isClickable = typeof path === "string" && path.length > 0;
  const isNavigatingRef = useRef<boolean>(false);

  const handleNavigate = useCallback(() => {
    if (!isClickable || isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push(path as string);
  }, [isClickable, path, router]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      // 统一使用浏览器的点击判定逻辑（会自动区分滚动 vs 点击）
      onClick={isClickable ? handleNavigate : undefined}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={ariaLabel}
      className={`card-standard group relative will-change-transform ${isClickable ? "cursor-pointer" : ""} ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        touchAction: isClickable ? 'manipulation' : 'auto' // 优化移动端触摸响应
      }}
    >
      {/* 动态光晕层 */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, var(--color-primary-gold) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          mixBlendMode: 'soft-light',
          zIndex: 1,
        }}
      />

      {/* 内容层：确保在光晕上方 */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};