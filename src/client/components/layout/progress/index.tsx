import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useInterval, usePrevious, useIsomorphicLayoutEffect } from 'react-use';

import clsx from 'clsx';
import { motion, HTMLMotionProps, useMotionValue, useTransform } from 'framer-motion';

import { useSSR } from '@/client/utils';

import s from './progress.scss';

interface ProgressContextProps {
  isAnimating: boolean;
  toggleAnimation: (value?: boolean) => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  isAnimating: false,
  toggleAnimation: () => {},
});

export function Progress({ className, ...rest }: HTMLMotionProps<'div'>) {
  const location = useLocation();
  const { isBrowser } = useSSR();
  const { isAnimating } = useContext(ProgressContext);
  const previousIsAnimating = usePrevious(isAnimating);
  const progress = useMotionValue(0);
  const opacity = useMotionValue(0);
  const width = useTransform(progress, x => `${x}%`);

  useIsomorphicLayoutEffect(() => {
    function updateOpacity() {
      const curr = progress.get();
      if (curr === 0 || curr === 100) {
        opacity.set(0);
      } else {
        opacity.set(1);
      }
    }

    const unsubscribeProgress = progress.onChange(updateOpacity);

    return () => unsubscribeProgress();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isAnimating) {
      progress.set(0, false);
    }
  }, [location, isAnimating]);

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) {
      if (isAnimating && !previousIsAnimating) {
        progress.set(0);
      }

      if (!isAnimating && previousIsAnimating) {
        progress.set(100);
      }
    }
  }, [isAnimating]);

  useInterval(() => {
    const curr = progress.get();
    if (isAnimating) {
      progress.set(curr + 10);
    }
  }, 500);

  return (
    <motion.div
      role="status"
      style={{ width, opacity }}
      key={location.pathname}
      className={clsx(s.root, className)}
      {...rest}
    >
      <div className={s.bar} />
      <div className={s.peg} />
    </motion.div>
  );
}
