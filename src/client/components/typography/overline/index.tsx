import clsx from 'clsx';
import React from 'react';

import s from './overline.scss';

interface OverlineProps extends React.HTMLAttributes<HTMLParagraphElement> {
  gutterBottom?: boolean;
}

export function Overline({ children, className, gutterBottom = false, ...rest }: OverlineProps) {
  return (
    <small className={clsx(s.overline, { [s.margin]: gutterBottom }, className)} {...rest}>
      {children}
    </small>
  );
}
