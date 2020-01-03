import clsx from 'clsx';
import React, { forwardRef } from 'react';

import s from './grid.scss';

export const Grid = forwardRef(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={clsx(s.grid, className)} {...rest}>
      {children}
    </div>
  )
);
