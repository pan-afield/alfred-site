// 文件描述：Sanity 客户端配置
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-27',
  useCdn: false, // 开发环境禁用 CDN 以确保实时数据
})

// 图片 URL 构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// 带重试机制的 fetch 包装函数
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn()
    } catch (error) {
      lastError = error
      
      // 如果是最后一次尝试，直接抛出错误
      if (attempt === maxRetries) {
        throw error
      }

      // 指数退避：等待时间逐渐增加
      const waitTime = delay * Math.pow(2, attempt)
      console.warn(`Sanity 请求失败 (尝试 ${attempt + 1}/${maxRetries + 1})，${waitTime}ms 后重试...`)
      
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }

  throw lastError
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
  }`
  
  try {
    // 使用重试机制获取数据
    return await fetchWithRetry(() => client.fetch(query), 3, 1000)
  } catch (error) {
    console.error('获取电影数据失败（已重试）:', error)
    // 返回空数组而不是抛出错误，避免页面崩溃
    return []
  }
}