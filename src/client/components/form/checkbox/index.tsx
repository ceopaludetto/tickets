import clsx from 'clsx';
import React from 'react';
import { FiCheck } from 'react-icons/fi';

import { Label } from '@/client/components/typography';

import s from './checkbox.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
  labelPlacement?: 'top' | 'right';
}

export function Checkbox({ label, id, color = 'secondary', labelPlacement = 'top', ...rest }: CheckboxProps) {
  return (
    <div
      className={clsx(s['form-group'], { [s.top]: labelPlacement === 'top', [s.right]: labelPlacement === 'right' })}
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
              <FiCheck className={s.icon} />
            </div>
          </>
        </div>
      </>
    </div>
  );
}
