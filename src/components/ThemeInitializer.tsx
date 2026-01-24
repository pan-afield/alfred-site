"use client";
import { useEffect } from 'react';
import { useSettingStore } from '@/store/settingStore';

export const ThemeInitializer = () => {
    const setTheme = useSettingStore((state) => state.setTheme);

    useEffect(() => {
        // 1. 检查本地是否有存储过主题
        const savedTheme = localStorage.getItem('user-theme-preference');

        if (!savedTheme) {
            // 2. 如果没存过，探测系统偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        } else {
            // 3. 如果存过，确保 DOM class 同步（从持久化状态中读取）
            const { state } = JSON.parse(savedTheme);
            document.documentElement.classList.add(state.theme);
        }
        console.log(savedTheme);
    }, [setTheme]);

    return null; // 这个组件不渲染任何内容
};