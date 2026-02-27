"use client";
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { TechCard } from '@/components/bento/TechCard';
import { LifeCard } from '@/components/bento/LifeCard';
import { TravelCard } from '@/components/bento/TravelCard';
import { GamesCard } from '@/components/bento/GamesCard';
import { MusicCard } from '@/components/bento/MusicCard';
import { CinemaCard } from '@/components/bento/CinemaCard';
import { CookingCard } from '@/components/bento/CookingCard';
import { CarCard } from '@/components/bento/CarCard';

interface Movie {
    title: string;
    year: string;
    accentColor: string;
    poster?: string;
}

interface Game {
    coverImage?: string;
}

interface Music {
    coverImage?: string;
}

interface MainPageProps {
    initialMovies: Movie[];
    initialGame?: Game | null;
    initialMusic?: Music | null;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        }
    }
};

export default function MainPage({ initialMovies, initialGame, initialMusic }: MainPageProps) {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]"
        >
            {/* 1. 技术栈 (2x2) */}
            <TechCard path="/projects" ariaLabel="打开 Projects 页面" />

            {/* 2. 伴侣与猫 (2x2) */}
            <LifeCard path="/life" ariaLabel="打开 Life 页面" />

            {/* 3. 旅游 (1x2) - 竖长块 */}
            <TravelCard path="/travel" ariaLabel="打开 Travel 页面" />

            {/* 4. 游戏 (2x1) */}
            <GamesCard path="/games" ariaLabel="打开 Games 页面" coverImage={initialGame?.coverImage} />

            {/* 5. 音乐 (1x2) */}
            <MusicCard path="/music" ariaLabel="打开 Music 页面" coverImage={initialMusic?.coverImage} />

            {/* 6. 影音 (2x1) */}
            <CinemaCard path="/cinema" ariaLabel="View my cinema reviews" initialData={initialMovies} />

            {/* 7. 烹饪 (2x1) - 横长块 */}
            <CookingCard path="/cooking" ariaLabel="打开 Cooking 页面" />

            {/* 8. 汽车 (2x1) */}
            <CarCard path="/car" ariaLabel="打开 Car 页面" />
        </motion.section>
    );
}