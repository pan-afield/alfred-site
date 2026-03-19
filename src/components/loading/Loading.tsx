'use client';

import { useRef } from 'react';
import Lottie from 'lottie-react';
import catPlaying from '@/assets/lottie/catPlaying.json';

export default function Loading() {
  const lottieRef = useRef<{
    setSpeed: (s: number) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
  } | null>(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen fixed top-0 left-0">
      <div className="flex flex-col items-center justify-center pb-20">
        <Lottie
          animationData={catPlaying}
          loop
          autoplay
          lottieRef={lottieRef}
          onDOMLoaded={() => lottieRef.current?.setSpeed(2)}
        />
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    </div>
  );
}
