import React from 'react';

import clsx from 'clsx';
import { RoundCheck } from 'mdi-norm';

import { Label } from '@/client/components/typography';

import s from './checkbox.scss';
import { CheckboxProps } from './index.dto';

export function Checkbox({
  label,
  id,
  color = 'secondary',
  className,
  labelPlacement = 'top',
  ...rest
}: CheckboxProps) {
  return (
    <div
      className={clsx(
        s['form-group'],
        { [s.top]: labelPlacement === 'top', [s.right]: labelPlacement === 'right' },
        className
      )}
    >
      <>
        {label && (
          <Label htmlFor={id} className={s.label}>
            {label}
          </Label>
        )}
        <div className={s.wrapper}>
          <>
            <input id={id} type="checkbox" className={clsx(s.input, s[color])} {...rest} />
            <div className={s.switch}>
              <RoundCheck className={s.icon} />
            </div>
          </>
        </div>
      </>
    </div>
  );
}
