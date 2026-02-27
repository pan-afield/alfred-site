// src/components/WorldMap.tsx
"use client"; // 必须是客户端组件

import Map, { Marker, NavigationControl, type ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; // 引入样式
import { useState } from 'react';

// 定义足迹的数据结构
interface Footprint {
  _id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  coverImage: string;
}

export default function WorldMap({ footprints = [] }: { footprints?: Footprint[] }) {
  // 初始视角：设置在亚洲或你所在的区域
  const [viewState, setViewState] = useState({
    longitude: 110, // 东经
    latitude: 30,   // 北纬
    zoom: 2.5       // 缩放级别：看大洲
  });

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 relative">
      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        // 样式：这是 Mapbox 官方的深色模式，非常适合你的网站
        mapStyle="mapbox://styles/mapbox/dark-v11" 
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />

        {/* 遍历足迹数据，生成标记点 */}
        {(footprints ?? []).filter(fp => fp.location?.lat != null && fp.location?.lng != null).map((fp) => (
          <Marker 
            key={fp._id} 
            longitude={fp.location.lng} 
            latitude={fp.location.lat}
            anchor="bottom"
          >
            {/* 自定义标记样式：一个小光点 + 脉冲效果 */}
            <div className="group relative cursor-pointer">
              {/* 脉冲光环 */}
              <div className="absolute -inset-2 bg-amber-500/20 rounded-full animate-ping opacity-75" />
              {/* 实心点 */}
              <div className="relative w-3 h-3 bg-amber-500 rounded-full border border-black shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-150" />
              
              {/* Hover 时显示的 Tooltip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 bg-zinc-900 border border-white/10 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="text-xs text-center font-bold text-white">{fp.title}</p>
              </div>
            </div>
          </Marker>
        ))}
      </Map>
      
      {/* 装饰性遮罩：让地图边缘渐隐，融入背景 */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
}