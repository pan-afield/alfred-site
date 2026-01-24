import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      theme: 'light', // 初始值
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        
        // 清除可能存在的内联样式，让 CSS 变量自然生效
        document.documentElement.style.removeProperty('--color-primary-gold');
        
        // 更新类名，CSS 变量会通过 .light 或 .dark 类自动应用
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        
        return { theme: newTheme };
      }),
      setTheme: (theme) => {
        // 清除可能存在的内联样式，让 CSS 变量自然生效
        document.documentElement.style.removeProperty('--color-primary-gold');
        
        // 更新类名，CSS 变量会通过 .light 或 .dark 类自动应用
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        set({ theme });
      },
    }),
    {
      name: 'user-theme-preference', // localStorage 中的 key
    }
  )
);