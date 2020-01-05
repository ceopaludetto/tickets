import React from 'react';

import clsx from 'clsx';

import c from '@/client/scss/utils.scss';

import s from './title.scss';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  gutterBottom?: boolean;
}

export function Title({ children, className, gutterBottom = false, ...rest }: TitleProps) {
  return (
    <h1 className={clsx(s.title, { [c['xs:mb-3']]: gutterBottom }, className)} {...rest}>
      {children}
    </h1>
  );
}
