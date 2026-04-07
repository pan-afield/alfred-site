'use client'; // 记得加这个，因为有交互
import { useSettingStore } from '@/store/settingStore';
import gsap from 'gsap';

export default function ThemeToggle() {
  const toggleTheme = useSettingStore((state) => state.toggleTheme);
  const theme = useSettingStore((state) => state.theme);

  const handleToggle = () => {
    // GSAP 动画：页面瞬间闪烁一下，配合主题切换
    const tl = gsap.timeline();

    tl.to('body', {
      filter: 'brightness(1.2) blur(2px)',
      duration: 0.1,
      onComplete: toggleTheme, // 动画中点切换主题
    }).to('body', {
      filter: 'brightness(1) blur(0px)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="p-[8px] rounded-2xl cursor-pointer bg-card-bg border border-card-border hover:text-primary-gold transition-all"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
