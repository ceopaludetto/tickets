import { useNProgress } from '@tanem/react-nprogress';
import clsx from 'clsx';
import React, { createContext, useContext } from 'react';

import s from './progress.scss';

interface ProgressContextProps {
  isAnimating: boolean;
  toggleAnimation: (value?: boolean) => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  isAnimating: false,
  toggleAnimation: () => {},
});

export function Progress({ className, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const { isAnimating } = useContext(ProgressContext);
  const { progress, isFinished } = useNProgress({ isAnimating, animationDuration: 100 });

  return (
    <div
      className={clsx(s.root, className)}
      style={{ width: `${progress * 100}%`, opacity: !isFinished ? 1 : 0, ...style }}
      {...rest}
    >
      <div className={s.bar} />
      <div className={s.peg} />
    </div>
  );
}
