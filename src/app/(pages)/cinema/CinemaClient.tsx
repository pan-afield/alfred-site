"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MovieReview } from '@/types/cinema';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export default function CinemaClient({ initialMovies }: { initialMovies: MovieReview[] }) {

    // 1. 保险：如果数组为空，给它一个 null，或者一个默认值
    const [activeMovie, setActiveMovie] = useState(initialMovies?.[0] || null);

    // 2. 如果根本没有电影数据，直接展示一个友好的提示，而不是报错
    if (!initialMovies || initialMovies.length === 0) {
        return (
            <div className="py-20 text-center opacity-50">
                <p>还没有录入影评，去 /studio 发布一个吧...</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* 1. 动态背景光晕 - 与当前选中的电影主题色联动 */}
            <div
                className="fixed inset-0 z-[-1] transition-colors duration-1000 blur-[150px] opacity-20"
                style={{ backgroundColor: activeMovie.accentColor }}
            />

            <header className="mb-16">
                <h1 className="text-5xl font-bold tracking-tighter">CINEMA</h1>
                <p className="text-dim mt-2 tracking-widest text-sm">光影是流动的建筑 / {initialMovies.length} ENTRIES</p>
            </header>

            {/* 2. 电影列表 - 采用非对称网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {initialMovies.map((movie, index) => (
                    <motion.div
                        key={movie._id}
                        onMouseEnter={() => setActiveMovie(movie)}
                        className="group cursor-pointer flex gap-6 items-start"
                        whileHover={{ x: 0 }}
                    >
                        {/* 海报容器 */}
                        <div className="relative w-40 h-60 shrink-0 overflow-hidden rounded-xl bg-card-bg border border-card-border">
                            <Image
                                src={urlFor(movie.poster).width(600).url()} // 1. 自动请求压缩后的 600px 宽度图
                                alt={movie.title}
                                fill // 填充父容器
                                sizes="(max-width: 768px) 160px, 160px" // 告诉浏览器不同尺寸下的预期宽度
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                                priority={index < 4} // 前几个海报优先加载，提升 LCP 性能
                                placeholder="blur" // 2. 开启占位效果
                                blurDataURL={urlFor(movie.poster).width(20).blur(10).url()} // 3. 极小模糊图作为占位
                            />
                        </div>

                        {/* 内容区 */}
                        <div className="flex flex-col justify-center h-full">
                            <span className="text-xs font-mono opacity-40 mb-1">{movie.year} / {movie.director}</span>
                            {/* <h2 className="text-2xl font-bold group-hover:text-amber-500 transition-colors">{movie.title}</h2> */}
                            <div className="flex items-center gap-4 mt-2">
                                <h2 className="text-2xl font-bold tracking-tight group-hover:text-amber-500 transition-colors">
                                    {movie.title}
                                </h2>
                                {/* 评分条 */}
                                {/* <div className="flex gap-0.5">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1 h-4 rounded-full transition-all duration-500 ${i < movie.rating
                                                ? 'bg-amber-500'
                                                : 'bg-white/10'
                                                }`}
                                        />
                                    ))}
                                </div> */}
                                <div className="text-sm text-dim opacity-40 shrink-0">
                                    {movie.rating} Rating
                                </div>
                            </div>
                            <p
                                className="text-dim text-sm mt-3 leading-relaxed max-w-sm line-clamp-5"
                            // title={movie.thought}
                            >
                                “ {movie.thought} ”
                            </p>
                            <div className="flex gap-2 mt-4">
                                {movie.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full border border-card-border opacity-60">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}