'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import Lottie from 'lottie-react';
import catPlaying from '@/assets/lottie/catPlaying.json';

export default function Loading() {
  const lottieRef = useRef<{
    setSpeed: (s: number) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
  } | null>(null);

  const overlay = (
    <div
      className="pointer-events-none fixed inset-0 z-60 flex flex-col items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center pb-20">
        <Lottie
          animationData={catPlaying}
          loop
          autoplay
          lottieRef={lottieRef}
          onDOMLoaded={() => lottieRef.current?.setSpeed(2)}
        />
        <div className="text-text-main text-2xl font-bold">Loading...</div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(overlay, document.body);
}
