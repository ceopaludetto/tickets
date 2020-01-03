import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';

import s from './paper.scss';

interface PaperProps extends HTMLMotionProps<'div'> {
  border?: boolean;
  elevate?: boolean;
  hasInner?: boolean;
  small?: boolean;
}

export function Paper({
  children,
  border = false,
  elevate = false,
  small = false,
  hasInner = false,
  className,
  ...rest
}: PaperProps) {
  return (
    <motion.div
      className={clsx(
        s.paper,
        {
          [s.border]: border,
          [s.elevate]: elevate,
          [s.inner]: !hasInner && !small,
          [s['inner-small']]: !hasInner && small,
        },
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

Paper.Inner = forwardRef(
  (
    { children, className, small = false, ...rest }: React.HTMLAttributes<HTMLDivElement> & Pick<PaperProps, 'small'>,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <div ref={ref} className={clsx({ [s.inner]: !small, [s['inner-small']]: small }, className)} {...rest}>
      {children}
    </div>
  )
);
