import React from 'react';
import clsx from 'clsx';

import s from './overline.scss';

export function Overline({ children, className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <small className={clsx(s.overline, className)} {...rest}>
      {children}
    </small>
  );
}
