export interface MovieReview {
    _id: string;
    title: string;
    originalTitle?: string;
    director: string;
    year: number;
    rating: number;      // 0-10
    poster: string;      // 海报 URL
    accentColor: string; // 每部电影提取一个主题色，用于光晕联动
    thought: string;     // 简评
    tags: string[];      // 标签如 ["科幻", "人性", "视觉盛宴"]
}

export const MOCK_MOVIES: MovieReview[] = [
    {
        _id: "1",
        title: "沙丘 2",
        originalTitle: "Dune: Part Two",
        director: "丹尼斯·维伦纽瓦",
        year: 2024,
        rating: 9.2,
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401", // 示例图
        accentColor: "#e2b170", // 沙漠金
        thought: "视觉奇观的巅峰，那种宿命论带来的压抑感在 IMAX 厅里被放大了无数倍。",
        tags: ["科幻", "视听"]
    },
    // ... 更多数据
];