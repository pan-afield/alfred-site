import { getCookingById } from '@/lib/sanity'; // 假设你已写好 fetch
import Image from 'next/image';
import Link from 'next/link';

// 获取单条数据的逻辑
export default async function CookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getCookingById(id);

  if (!recipe)
    return <div className="py-24 text-center">Recipe not found.</div>;

  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 返回与分类 */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/cooking"
            className="text-zinc-500 hover:text-amber-500 transition-colors font-mono text-sm uppercase italic"
          >
            ← Back to Kitchen
          </Link>
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {recipe.category}
          </span>
        </div>

        {/* 标题区域 */}
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-12">
          {recipe.title}
        </h1>

        {/* 顶部大图：带有一个微妙的边框效果 */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-16 border border-white/5 shadow-2xl">
          <Image
            src={recipe.coverImage}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* 核心内容网格 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* 左侧：食材清单 (占据 4 列) */}
          <div className="md:col-span-4">
            <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 border-b border-zinc-900 pb-2">
              Ingredients
            </h3>
            <ul className="space-y-4">
              {recipe.ingredients?.map((ing: string, i: number) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-4 h-4 rounded border border-zinc-700 mt-1 group-hover:border-amber-500 transition-colors" />
                  <span className="text-zinc-300 font-medium">{ing}</span>
                </li>
              ))}
            </ul>

            {/* 难度显示 */}
            <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-white/5">
              <p className="text-[10px] text-zinc-600 uppercase font-mono mb-2">
                Difficulty
              </p>
              <p className="text-lg font-bold">
                {recipe.difficulty === 'easy'
                  ? '🍳 Easy'
                  : recipe.difficulty === 'medium'
                    ? '🔥 Medium'
                    : '👨‍🍳 Master'}
              </p>
            </div>
          </div>

          {/* 右侧：做法与故事 (占据 8 列) */}
          <div className="md:col-span-8">
            {/* 故事背后的心情 */}
            <section className="mb-16">
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-6">
                The Story
              </h3>
              <p className="text-xl text-zinc-400 italic font-serif leading-relaxed">
                &quot;{recipe.story}&quot;
              </p>
            </section>

            {/* 烹饪步骤 */}
            <section>
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-8">
                Instructions
              </h3>
              <div className="prose prose-invert max-w-none">
                {/* 这里的 whitespace-pre-wrap 是关键，它能保留你在 Sanity 后台输入的换行 */}
                <p className="text-zinc-300 text-lg leading-[1.8] whitespace-pre-wrap">
                  &quot;{recipe.instructions}&quot;
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
