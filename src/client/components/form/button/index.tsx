import React from 'react';
import clsx from 'clsx';

import styles from './index.scss';
import { Typography } from '@/client/components/primitive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function Button({ children, variant = 'contained', color = 'primary', type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={clsx(styles.button, styles[variant], styles[color])} {...rest}>
      <Typography as="span" variant="button">
        {children}
      </Typography>
    </button>
  );
}
