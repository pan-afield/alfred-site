"use client"; // 记得加这个，因为有交互
import { useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("light", !newTheme);
        // 这里也可以加逻辑存入 localStorage
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-card-bg border border-card-border hover:text-primary-gold transition-all"
        >
            {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}