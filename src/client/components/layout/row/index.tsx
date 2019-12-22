import React from 'react';
import clsx from 'clsx';

import styles from './index.scss';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between';
  wrap?: 'w-wrap' | 'w-nowrap' | 'w-wrap-reverse';
}

const mapJustify = {
  center: styles['justify-center'],
  'flex-start': styles['justify-flex-start'],
  'flex-end': styles['justify-flex-end'],
  'space-around': styles['justify-space-around'],
  'space-between': styles['justify-space-between'],
};

const mapAlign = {
  center: styles['align-center'],
  stretch: styles['align-stretch'],
  baseline: styles['align-baseline'],
  'flex-start': styles['align-flex-start'],
  'flex-end': styles['align-flex-end'],
};

export function Row({ children, align = 'flex-start', justify = 'flex-start', wrap = 'w-wrap', ...rest }: RowProps) {
  const classes = clsx(styles.row, mapJustify[justify], mapAlign[align], styles[wrap]);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
