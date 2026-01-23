'use client';
import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-6 h-auto md:h-[1100px] ${className}`}
    >
      {children}
    </section>
  );
}
