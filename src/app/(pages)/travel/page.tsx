import { getFootprints } from '@/lib/sanity';
import WorldMap from '@/components/WorldMap';

export default async function TravelPage() {
  const footprints = await getFootprints();

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-text-main mb-4">World Footprints</h1>
        <p className="text-text-dim">
          记录我去过的每一个角落，标记这个世界的经纬度。
        </p>
      </header>

      {/* 这里加载地图组件 */}
      <section className="mb-20">
        <WorldMap footprints={footprints} />
      </section>

      {/* 这里可以继续放照片墙... */}
    </div>
  );
}