import React from 'react';

import clsx from 'clsx';

import { Label } from '@/client/components/typography';

import s from './switch.scss';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function Switch({ color = 'primary', label, id, ...rest }: SwitchProps) {
  return (
    <div className={s['form-group']}>
      <>
        {label && (
          <Label htmlFor={id} className={s.label}>
            {label}
          </Label>
        )}
        <div className={s.wrapper}>
          <>
            <input id={id} type="checkbox" className={clsx(s.input, s[color])} {...rest} />
            <div className={s.switch} />
          </>
        </div>
      </>
    </div>
  );
}
