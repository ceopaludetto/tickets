import React from 'react';
import clsx from 'clsx';

import s from './grid.scss';

export function Grid({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(s.grid, className)} {...rest}>
      {children}
    </div>
  );
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  column?: number;
}

Grid.Item = ({ children, className, column = 12, ...rest }: GridItemProps) => (
  <div className={clsx(s[column], className)} {...rest}>
    {children}
  </div>
);
