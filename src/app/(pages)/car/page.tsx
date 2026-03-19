// src/app/(pages)/car/page.tsx
import { getCars } from '@/lib/sanity';
import Image from 'next/image';

// 关键 UI 逻辑：根据状态显示不同的颜色标签
const statusMap: any = {
  current: { label: 'CURRENT DRIVE', color: 'border-green-500 text-green-400' },
  past: { label: 'PAST MEMORY', color: 'border-zinc-600 text-zinc-500' },
  dream: { label: 'DREAM LIST', color: 'border-amber-500 text-amber-400' },
};

export default async function GaragePage() {
  const cars = await getCars();

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* 头部宣言 */}
      <header className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase">
          Alfred&apos;s Garage
        </h1>
        <p className="text-xl text-zinc-400 font-mono tracking-tighter uppercase italic border-l-2 border-amber-500 pl-4">
          Experimental Lab. Pure performance.
        </p>
      </header>

      {/* 横向滚动容器 */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 pb-20 px-[5vw] md:px-[10vw]">
        {cars.map((car: any) => (
          <div
            key={car._id}
            className="min-w-[85vw] md:min-w-[700px] aspect-[16/10] snap-center relative group rounded-3xl overflow-hidden border border-white/5 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-amber-500/30"
          >
            {/* 车辆大片 */}
            <Image
              src={car.coverImage}
              alt={car.model}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* 渐变遮罩层 (Heisenberg's Shade) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end" />

            {/* 内容区 */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-zinc-500 text-sm font-mono tracking-tight">
                    {car.brand}
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white mt-1 mb-3 group-hover:text-amber-400 transition-colors">
                    {car.model}
                  </h2>
                </div>
                {/* 状态标签 */}
                <div
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${statusMap[car.status]?.color}`}
                >
                  {statusMap[car.status]?.label}
                </div>
              </div>

              {/* 参数栏 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs text-zinc-600 font-mono uppercase">
                    Specs
                  </p>
                  <p className="text-lg font-bold text-amber-500 mt-1">
                    {car.specs || '--'}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-xs text-zinc-600 font-mono uppercase">
                    驾驶感受
                  </p>
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2 italic leading-relaxed">
                    &quot;
                    {car.story ||
                      'No data yet. Waiting for an experimental drive.'}
                    &quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* 占位符，保持滚动体验 */}
        <div className="min-w-[10vw]"></div>
      </div>
    </div>
  );
}
