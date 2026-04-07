'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { AnimationItem } from 'lottie-web';
import Lottie from 'lottie-react';
import confettiData from '@/assets/lottie/Confetti.json';

/** 单次播放：独立 lottieRef，避免连续点击时 ref 被新实例覆盖导致清理/监听错乱 */
function ConfettiBurst({
  burstId,
  burstRef,
  onComplete,
}: {
  burstId: number;
  burstRef: React.MutableRefObject<number>;
  onComplete: (id: number) => void;
}) {
  const lottieRef = useRef<{
    animationItem?: AnimationItem;
  } | null>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;
    let raf = 0;
    let cancelled = false;

    const onEnd = () => {
      if (burstRef.current === burstId) {
        onComplete(burstId);
      }
    };

    const tryAttach = () => {
      if (cancelled) return;
      anim = lottieRef.current?.animationItem;
      if (anim) {
        anim.addEventListener('complete', onEnd);
      } else {
        raf = requestAnimationFrame(tryAttach);
      }
    };

    tryAttach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try {
        anim?.removeEventListener('complete', onEnd);
      } catch {
        // 实例可能已被 lottie 销毁，忽略
      }
    };
  }, [burstId, burstRef, onComplete]);

  return (
    <Lottie
      lottieRef={lottieRef as never}
      animationData={confettiData}
      loop={false}
    />
  );
}

export default function Respect() {
  const burstRef = useRef(0);
  const [burstKey, setBurstKey] = useState(0);

  const handleClick = () => {
    burstRef.current += 1;
    setBurstKey(burstRef.current);
  };

  const handleBurstComplete = useCallback((id: number) => {
    if (burstRef.current === id) {
      setBurstKey(0);
    }
  }, []);

  const overlay =
    burstKey > 0 && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="pointer-events-none fixed inset-0 z-200 flex items-start justify-center pt-[min(20vh,120px)]"
            aria-hidden
          >
            <div className="max-h-[70vh] w-full max-w-2xl [&_svg]:h-auto [&_svg]:max-h-[70vh]">
              <ConfettiBurst
                key={burstKey}
                burstId={burstKey}
                burstRef={burstRef}
                onComplete={handleBurstComplete}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className="gap-1.5 p-[8px] rounded-2xl bg-card-bg border border-card-border inline-flex items-center justify-center text-text-main hover:text-primary-gold cursor-pointer transition-colors shadow-sm"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Respect"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2Z" />
        </svg>
        <span className="text-sm font-medium">Respect</span>
      </div>
      {overlay}
    </>
  );
}
