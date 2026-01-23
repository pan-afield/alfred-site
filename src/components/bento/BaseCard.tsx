'use client';

import React, { useRef } from 'react';
import { Variants, motion } from 'framer-motion';
import gsap from 'gsap';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
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

export const BaseCard = ({ children, className = "" }: BaseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !lightRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // 计算倾斜角度 (范围在 -5deg 到 5deg 之间)
    const xRotation = ((y - height / 2) / height) * -10;
    const yRotation = ((x - width / 2) / width) * 10;

    // 使用 GSAP 进行丝滑的旋转
    gsap.to(cardRef.current, {
      rotateX: xRotation,
      rotateY: yRotation,
      duration: 0.5,
      ease: "power2.out",
      perspective: 1000
    });

    // 移动手电筒光晕
    gsap.to(lightRef.current, {
      x: x - 150, // 150 是光晕半径
      y: y - 150,
      opacity: 1,
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    // 恢复原状
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(lightRef.current, {
      opacity: 0,
      duration: 0.5
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-standard group relative will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
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