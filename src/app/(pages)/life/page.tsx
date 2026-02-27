// src/app/(pages)/life/page.tsx
import { getLifeMoments } from '@/lib/sanity';
import Image from 'next/image';

export default async function LifePage() {
  const moments = await getLifeMoments();

  return (
    <div className="max-w-2xl mx-auto py-24 px-6">
      <header className="mb-16 text-center">
        <h1 className="text-3xl font-bold text-text-main mb-2">Life Moments</h1>
        <p className="text-sm text-text-dim italic">碎碎念，以及生活的瞬间。</p>
      </header>

      <div className="space-y-20">
        {moments.map((item: any) => (
          <article key={item._id} className="relative">
            {/* 时间线装饰 */}
            <div className="absolute -left-8 top-1.5 text-[10px] font-mono text-zinc-600 rotate-90 origin-left uppercase tracking-widest">
              {new Date(item.publishedAt).toLocaleDateString('zh-CN')}
            </div>

            {/* 文字内容 */}
            <p className="text-text-main leading-relaxed mb-4 whitespace-pre-wrap">
              {item.content}
            </p>

            {/* 图片网格布局 */}
            {item.images && item.images.length > 0 && (
              <div className={`grid gap-2 ${
                item.images.length === 1 ? 'grid-cols-1' : 
                item.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {item.images.map((img: string, index: number) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
                    <Image 
                      src={img} 
                      alt="moment" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 地点信息 */}
            {item.locationName && (
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-500/70">
                <span className="text-[10px]">📍</span>
                {item.locationName}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}