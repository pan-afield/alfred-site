import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity 的图片域名
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 你现在 Mock 数据用的域名
      },
    ],
  },
}

export default nextConfig;