import React from 'react';
import clsx from 'clsx';

import styles from './index.scss';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  elevate?: boolean;
  hoverable?: boolean;
}

export function Paper({ children, elevate = false, hoverable = false, ...rest }: PaperProps) {
  return (
    <div className={clsx(styles.paper, { [styles.elevate]: elevate, [styles.hoverable]: hoverable })} {...rest}>
      {children}
    </div>
  );
}
