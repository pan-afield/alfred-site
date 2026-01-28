// src/sanity/env.ts

// 1. 如果有环境变量就用环境变量，没有就用后面的字符串
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// 2. 这里填入你从 Sanity Manage 后台看到的那个真实项目 ID
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7z3qawzl';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-27';

// 保持这个辅助函数不变，或者删掉它也没关系了
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // 暂时注释掉 throw，避免干扰 Studio 启动
    console.warn(errorMessage);
    return '' as T;
  }
  return v
}