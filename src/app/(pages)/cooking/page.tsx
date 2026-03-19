// src/app/(pages)/cooking/page.tsx
import { getCookingRecipes } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function CookingPage() {
  const recipes = await getCookingRecipes();

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <header className="mb-16">
        <h1 className="text-4xl font-bold text-text-main mb-4 uppercase tracking-widest">
          Alfred&apos;s Kitchen
        </h1>
        <p className="text-text-dim border-l-2 border-amber-500 pl-4 italic">
          “唯有美食与爱不可辜负。”
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((recipe: any) => (
          <div
            key={recipe._id}
            className="group bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/20 transition-all duration-500"
          >
            {/* 图片容器 */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={recipe.coverImage}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-amber-400 font-bold border border-white/10">
                {recipe.category}
              </div>
            </div>

            {/* 内容区 */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">
                  {recipe.title}
                </h3>
                <span className="text-xs text-zinc-500 uppercase tracking-tighter">
                  {recipe.difficulty === 'easy'
                    ? '🟢 Easy'
                    : recipe.difficulty === 'medium'
                      ? '🟡 Medium'
                      : '🔴 Hard'}
                </span>
              </div>

              <p className="text-sm text-zinc-400 line-clamp-2 mb-6 italic leading-relaxed">
                &quot;{recipe.story}&quot;
              </p>

              {/* 食材预览 - 小标签形式 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.ingredients
                  ?.slice(0, 3)
                  .map((ing: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white/5 px-2 py-1 rounded text-zinc-500"
                    >
                      {ing}
                    </span>
                  ))}
                {recipe.ingredients?.length > 3 && (
                  <span className="text-[10px] text-zinc-600">...</span>
                )}
              </div>

              <Link href={`/cooking/${recipe._id}`}>
                <button className="w-full py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">
                  查看完整做法
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
