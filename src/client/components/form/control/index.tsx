import React, { useRef } from 'react';
import clsx from 'clsx';

import styles from './index.scss';
import { Typography } from '@/client/components/primitive';

interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  append?: React.ReactElement<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function Control({ label, id, append, color = 'primary', placeholder = ' ', ...rest }: ControlProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx(styles['form-group'], styles[color])}>
      <>
        <input placeholder={placeholder} ref={ref} className={styles.input} id={id} {...rest} />
        {label && (
          <Typography className={styles.label} variant="label" as="label" htmlFor={id}>
            {label}
          </Typography>
        )}
        {append && <div className={styles.append}>{append}</div>}
      </>
    </div>
  );
}
