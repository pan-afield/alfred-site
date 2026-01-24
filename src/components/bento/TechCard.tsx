'use client';
import { BaseCard } from './BaseCard';

const STACKS = [
  { name: 'React', color: 'text-blue-400' },
  { name: 'Next.js', color: 'text-text-main' },
  { name: 'TypeScript', color: 'text-blue-500' },
  { name: 'Tailwind', color: 'text-cyan-400' },
  { name: 'Three.js', color: 'text-emerald-400' },
  { name: 'Framer Motion', color: 'text-pink-400' },
  { name: 'pnpm', color: 'text-yellow-500' },
];

interface TechCardProps {
  path?: string;
  ariaLabel?: string;
}

export const TechCard = ({ path, ariaLabel }: TechCardProps) => {
  return (
    <BaseCard
      className="md:col-span-2 md:row-span-2 flex flex-col justify-between h-full"
      path={path}
      ariaLabel={ariaLabel}
    >
      {/* 顶部：标题与图标 */}
      <div>
        <div className="flex justify-between items-start">
          <span className="badge-base bg-tech-blue/10 text-tech-blue border-tech-blue/20">
            Professional Skills
          </span>
          <div className="text-2xl opacity-50">⚡</div>
        </div>
        <h2 className="text-4xl font-bold mt-6 text-text-main tracking-tight">
          Tech Stack
        </h2>
        <p className="mt-4 text-text-dim max-w-[280px] leading-relaxed">
          专注于构建高性能、响应式且具有极致交互体验的现代 Web 应用。
        </p>
      </div>

      {/* 底部：技术标签阵列 */}
      <div className="flex flex-wrap gap-2 mt-8">
        {STACKS.map((tech) => (
          <span
            key={tech.name}
            className={`text-xs px-3 py-1.5 bg-text-main/5 rounded-lg border border-card-border ${tech.color} font-medium transition-transform hover:scale-105 hover:bg-text-main/10`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </BaseCard>
  );
};