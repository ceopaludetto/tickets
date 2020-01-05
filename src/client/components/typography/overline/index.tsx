import React from 'react';

import clsx from 'clsx';

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
