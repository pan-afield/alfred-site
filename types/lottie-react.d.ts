declare module 'lottie-react' {
  import type { FC, MutableRefObject } from 'react';

  interface LottieRefCurrentProps {
    setSpeed: (speed: number) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
  }

  interface LottieProps {
    animationData: object;
    loop?: boolean | number;
    autoplay?: boolean;
    lottieRef?: MutableRefObject<LottieRefCurrentProps | null>;
    onDOMLoaded?: () => void;
  }

  const Lottie: FC<LottieProps>;
  export default Lottie;
}
