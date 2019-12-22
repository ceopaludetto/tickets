import React from 'react';
import clsx from 'clsx';

import styles from './index.scss';
import { Typography } from '@/client/components/primitive';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function Switch({ color = 'primary', label, id, ...rest }: SwitchProps) {
  return (
    <div className={styles['form-group']}>
      <>
        {label && (
          <Typography htmlFor={id} className={styles.label} variant="label" as="label">
            {label}
          </Typography>
        )}
        <div className={styles.wrapper}>
          <>
            <input id={id} type="checkbox" className={clsx(styles.input, styles[color])} {...rest} />
            <div className={styles.switch} />
          </>
        </div>
      </>
    </div>
  );
}
