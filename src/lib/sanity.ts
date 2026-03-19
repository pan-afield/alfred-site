// 文件描述：Sanity 客户端配置
import { client } from '@/sanity/lib/client';

// 带重试机制的 fetch 包装函数
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;

      // 如果是最后一次尝试，直接抛出错误
      if (attempt === maxRetries) {
        throw error;
      }

      // 指数退避：等待时间逐渐增加
      const waitTime = delay * Math.pow(2, attempt);
      console.warn(
        `Sanity 请求失败 (尝试 ${attempt + 1}/${maxRetries + 1})，${waitTime}ms 后重试...`,
      );

      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

// 获取电影数据
export async function getMovies() {
  const query = `*[_type == "movie"] | order(_createdAt desc) {
    _id,
    title,
    director,
    year,
    rating,
    poster,
    accentColor,
    thought,
    tags
  }`;

  try {
    // 使用重试机制获取数据
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取电影数据失败（已重试）:', error);
    // 返回空数组而不是抛出错误，避免页面崩溃
    return [];
  }
}

// 获取技术日志数据
export async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    summary,
    tags,
    category
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取项目数据失败（已重试）:', error);
    return [];
  }
}

// 获取单个技术日志数据
export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    publishedAt,
    readingTime,
    summary,
    content,
    tags,
    "coverImage": coverImage.asset->url
  }`;

  // 使用第二个参数传递变量，防止注入攻击
  try {
    return await fetchWithRetry(() => client.fetch(query, { slug }), 3, 1000);
  } catch (error) {
    console.error('获取技术日志数据失败（已重试）:', error);
    return null;
  }
}

// 获取所有足迹
export async function getFootprints() {
  const query = `*[_type == "footprint"] {
    _id,
    title,
    location,
    "coverImage": coverImage.asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取足迹数据失败（已重试）:', error);
    return [];
  }
}

// 获取所有生活瞬间
export async function getLifeMoments() {
  const query = `*[_type == "life"] | order(publishedAt desc) {
    _id,
    content,
    locationName,
    publishedAt,
    "images": images[].asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取生活瞬间数据失败（已重试）:', error);
    return [];
  }
}

// 获取所有游戏
export async function getGames() {
  const query = `*[_type == "game"] | order(status asc, rating desc) {
    _id, title, platform, status, rating, review,
    "coverImage": coverImage.asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取游戏数据失败（已重试）:', error);
    return [];
  }
}

// 获取所有音乐
export async function getMusic() {
  const query = `*[_type == "music"] | order(_createdAt desc) {
    _id, title, artist, type, genre, spotifyUrl, comment,
    "coverImage": coverImage.asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取音乐数据失败（已重试）:', error);
    return [];
  }
}

// 获取所有食谱
export async function getCookingRecipes() {
  const query = `*[_type == "cooking"] | order(_createdAt desc) {
    _id, title, category, difficulty, ingredients, instructions, story,
    "coverImage": coverImage.asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取食谱数据失败（已重试）:', error);
    return [];
  }
}

// 获取所有座驾
export async function getCars() {
  const query = `*[_type == "car"] | order(status asc, _createdAt desc) {
    _id, model, brand, status, specs, modList, story,
    "coverImage": coverImage.asset->url
  }`;
  try {
    return await fetchWithRetry(() => client.fetch(query), 3, 1000);
  } catch (error) {
    console.error('获取座驾数据失败（已重试）:', error);
    return [];
  }
}

/**
 * 根据 ID 获取单条烹饪食谱详情
 * @param id Sanity 文档的 _id
 */
export async function getCookingById(id: string) {
  const query = `*[_type == "cooking" && _id == $id][0] {
    _id,
    title,
    category,
    difficulty,
    "coverImage": coverImage.asset->url,
    ingredients,
    instructions,
    story,
    _createdAt
  }`;

  // 使用 client.fetch 并传入变量 $id
  // 这里的 client 是你之前配置好的 createClient 实例
  return await fetchWithRetry(() => client.fetch(query, { id }), 3, 1000);
}
