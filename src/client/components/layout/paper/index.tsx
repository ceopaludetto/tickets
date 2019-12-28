import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

import s from './paper.scss';

interface PaperProps extends HTMLMotionProps<'div'> {
  elevate?: boolean;
  hasInner?: boolean;
}

export function Paper({ children, elevate = false, hasInner = false, className, ...rest }: PaperProps) {
  return (
    <motion.div className={clsx(s.paper, { [s.elevate]: elevate, [s.inner]: !hasInner }, className)} {...rest}>
      {children}
    </motion.div>
  );
}

Paper.Inner = forwardRef(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={clsx(s.inner, className)} {...rest}>
      {children}
    </div>
  )
);
