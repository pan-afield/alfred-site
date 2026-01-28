'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Variants, motion } from 'framer-motion';
import gsap from 'gsap';
import { useSettingStore } from '@/store/settingStore';

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
  const theme = useSettingStore((state) => state.theme);
  const router = useRouter();
  const isClickable = typeof path === "string" && path.length > 0;
  const [isMobile, setIsMobile] = useState(false);
  const touchStartTimeRef = useRef<number>(0);
  const isNavigatingRef = useRef<boolean>(false);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // 移动端触摸事件处理
  const handleTouchStart = useCallback(() => {
    if (!isClickable) return;
    touchStartTimeRef.current = Date.now();
    // 添加视觉反馈
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out"
      });
    }
  }, [isClickable]);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    const touchDuration = Date.now() - touchStartTimeRef.current;
    
    // 恢复缩放
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }

    // 如果触摸时间很短（< 300ms），认为是点击而不是滑动
    if (touchDuration < 300) {
      e.preventDefault();
      handleNavigate();
    }
  }, [isClickable, handleNavigate]);

  // PC 端鼠标事件处理（仅在非移动端启用）
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // 移动端禁用鼠标事件
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20; // 调整除数来控制倾斜幅度
    const rotateY = (centerX - x) / 20;

    // 计算偏移，让阴影向鼠标相反的方向延伸
    const moveX = (x - rect.width / 2) / 10;
    const moveY = (y - rect.height / 2) / 10;

    // 核心优化：判断主题选择颜色
    const shadowColor = theme === 'dark'
      ? 'rgba(251, 191, 36, 0.25)' // 暗色模式：琥珀金光晕
      : 'rgba(0, 0, 0, 0.15)';     // 浅色模式：经典柔和阴影

    gsap.to(card, {
      // 暗色下增加模糊半径 (60px) 并稍微缩小扩散范围 (-10px)
      boxShadow: theme === 'dark'
        ? `${-moveX}px ${-moveY}px 60px -10px ${shadowColor}`
        : `${-moveX}px ${-moveY}px 30px -5px ${shadowColor}`,
      y: -4, // 悬停时微浮
      duration: 0.4,
    });

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [isMobile, theme]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // 移动端禁用鼠标事件
    
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [isMobile]);

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onClick={!isMobile ? handleNavigate : undefined}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      onKeyDown={handleKeyDown}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
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