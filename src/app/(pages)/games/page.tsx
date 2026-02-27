import { getGames } from '@/lib/sanity';
import Image from 'next/image';
// 关键 UI 逻辑：根据状态显示不同的颜色标签
const statusMap: any = {
    playing: { label: 'PLAYING', color: 'bg-green-500 shadow-[0_0_10px_#22c55e]' },
    finished: { label: 'FINISHED', color: 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' },
    platinum: { label: 'PLATINUM', color: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' },
    onhold: { label: 'ON HOLD', color: 'bg-zinc-500 shadow-[0_0_10px_#71717a]' },
  };
  
  export default async function GamesPage() {
    const games = await getGames();
  
    return (
      <div className="max-w-6xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-black italic tracking-tighter mb-12">GAME LIBRARY</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game: any) => (
            <div key={game._id} className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-300">
              {/* 状态标签 */}
              <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold text-black ${statusMap[game.status]?.color}`}>
                {statusMap[game.status]?.label}
              </div>
  
              {/* 封面图 */}
              <div className="aspect-[3/4] relative">
                <Image src={game.coverImage} alt={game.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>
  
              {/* 信息层 */}
              <div className="absolute bottom-0 p-4 w-full">
                <p className="text-[10px] text-amber-500 font-mono mb-1">{game.platform}</p>
                <h3 className="font-bold text-white truncate mb-2">{game.title}</h3>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < game.rating ? 'text-amber-400' : 'text-zinc-700'}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }