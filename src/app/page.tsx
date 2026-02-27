import MainPage from './(main)/page';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { getMovies, getGames } from "@/lib/sanity";
import { urlFor } from '@/sanity/lib/image';

export default async function HomePage() {
  // 在服务器组件中获取数据
  const [movies, games] = await Promise.all([getMovies(), getGames()]);
  
  // 转换数据格式以匹配 CinemaCard 的接口
  const transformedMovies = movies.map((movie: { 
    title: string; 
    year: number; 
    accentColor?: string; 
    poster?: { _type: string; asset: { _ref: string; _type: string } } | null;
  }) => ({
    title: movie.title,
    year: String(movie.year),
    accentColor: movie.accentColor || '#e2b170',
    poster: movie.poster ? urlFor(movie.poster).width(280).height(360).url() : undefined,
  }));

  // 取第一条游戏数据作为 GamesCard 背景
  const initialGame = games?.[0] ? { coverImage: games[0].coverImage } : null;

  return (
    <main className="min-h-screen bg-app-bg max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">

      {/* 1. Header 区域 */}
      <Header />

      {/* 2. Bento Grid 核心展示区 */}
      <MainPage initialMovies={transformedMovies} initialGame={initialGame} />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}