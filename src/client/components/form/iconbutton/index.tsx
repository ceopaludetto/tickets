import React, { cloneElement } from 'react';
import clsx from 'clsx';

import styles from './index.scss';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<{ size: number }>; // eslint-disable-line @typescript-eslint/no-explicit-any
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function IconButton({ children, color = 'primary', ...rest }: IconButtonProps) {
  return (
    <button className={clsx(styles.button, styles[color])} {...rest}>
      {cloneElement(children, {
        size: 20,
      })}
    </button>
  );
}
