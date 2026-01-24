import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AmbientGlow } from "@/components/AmbientGlow";
import { ThemeInitializer } from "@/components/ThemeInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Alfred | Portfolio',
  description: 'Frontend Developer & Tech Explorer',
  // 核心配置
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }, // 优先使用 SVG
      { url: '/icon.png', type: 'image/png' },       // 备选使用 PNG
    ],
    apple: [
      { url: '/apple-touch-icon.png' }, // 用于 iPhone 桌面图标
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
    (function() {
      try {
        const stored = localStorage.getItem('user-theme-preference');
        let theme = 'light';
        if (stored) {
          theme = JSON.parse(stored).state.theme;
        } else {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.classList.add(theme);
      } catch (e) {}
    })()
  ` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        {/* 背景层 */}
        <AmbientGlow />

        {/* 内容层 */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
