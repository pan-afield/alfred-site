// src/app/(pages)/music/page.tsx
import { getMusic } from '@/lib/sanity';
import Image from 'next/image';

export default async function MusicPage() {
  const musicList = await getMusic();

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">MUSIC LIBRARY</h1>
          <p className="text-text-dim font-mono text-sm tracking-tighter uppercase italic">Soundtracks of my life.</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
          <span className="text-xl">💿</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {musicList.map((music: any) => (
          <div key={music._id} className="group relative">
            {/* 黑胶盘装饰效果 (Hover时滑出) */}
            <div className="absolute top-4 right-0 w-48 h-48 bg-zinc-800 rounded-full border-4 border-zinc-700 shadow-2xl transition-transform duration-700 group-hover:translate-x-12 hidden md:block" 
                 style={{ backgroundImage: 'repeating-radial-gradient(circle, #222 0%, #111 2%, #222 4%)' }}>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5" />
               </div>
            </div>

            {/* 封面主体 */}
            <div className="relative z-10 aspect-square bg-zinc-900 rounded shadow-2xl overflow-hidden border border-white/5 transition-transform duration-500 group-hover:-translate-x-4">
              <Image src={music.coverImage} alt={music.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 信息文字 */}
            <div className="mt-6">
              <span className="text-[10px] font-mono px-2 py-0.5 border border-amber-500/30 text-amber-500 rounded uppercase">
                {music.genre || 'Various'}
              </span>
              <h3 className="text-xl font-bold text-text-main mt-3 mb-1 group-hover:text-amber-500 transition-colors">
                {music.title}
              </h3>
              <p className="text-sm text-text-dim mb-4">{music.artist}</p>
              <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2 border-l-2 border-white/5 pl-3">
                &quot;{music.comment || 'No comments for this track.'}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}