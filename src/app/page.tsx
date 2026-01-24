"use client";

import MainPage from './(main)/page';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';


export default function HomePage() {
  return (
    <main className="min-h-screen bg-app-bg max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">

      {/* 1. Header 区域 */}
      <Header />

      {/* 2. Bento Grid 核心展示区 */}
      <MainPage />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}