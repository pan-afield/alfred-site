import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 可以通过环境变量强制启用 CDN（有助于解决网络问题）
  // 设置 NEXT_PUBLIC_SANITY_USE_CDN=true 来启用
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true' || process.env.NODE_ENV === 'production',
})
