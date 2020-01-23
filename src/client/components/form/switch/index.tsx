import React from 'react';

import clsx from 'clsx';

import { Label } from '@/client/components/typography';

import { SwitchProps } from './index.dto';
import s from './switch.scss';

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
