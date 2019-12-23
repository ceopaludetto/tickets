import React from 'react';
import clsx from 'clsx';

import styles from './paper.scss';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  elevate?: boolean;
}

export function Paper({ children, elevate = false, className, ...rest }: PaperProps) {
  return (
    <div className={clsx(styles.paper, { [styles.elevate]: elevate }, className)} {...rest}>
      {children}
    </div>
  );
}
