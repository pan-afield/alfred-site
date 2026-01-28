// 文件描述：Sanity 客户端配置
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-27',
  useCdn: false,
})

// 图片 URL 构建器
const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

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
  return await client.fetch(query)
}