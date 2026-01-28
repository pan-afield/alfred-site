// src/app/(pages)/cinema/page.tsx
import { getMovies } from "@/lib/sanity";
import CinemaClient from "./CinemaClient";

export default async function CinemaPage() {
    // 假设这是从 Sanity 获取的数据
    const movies = await getMovies();

    console.log(movies);

    return (
        <div className="max-w-6xl mx-auto">
            <CinemaClient initialMovies={movies} />
        </div>
    );
}