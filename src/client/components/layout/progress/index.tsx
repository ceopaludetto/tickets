import React, { createContext, useContext } from 'react';
import { useNProgress } from '@tanem/react-nprogress';

import s from './progress.scss';

interface ProgressContextProps {
  isAnimating: boolean;
  toggleAnimation: (value?: boolean) => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  isAnimating: false,
  toggleAnimation: () => {},
});

export function Progress() {
  const { isAnimating } = useContext(ProgressContext);
  const { progress, isFinished } = useNProgress({ isAnimating, animationDuration: 100 });

  return (
    <div className={s.root} style={{ width: `${progress * 100}%`, opacity: !isFinished ? 1 : 0 }}>
      <div className={s.bar} />
      <div className={s.peg} />
    </div>
  );
}
