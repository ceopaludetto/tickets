import React, { forwardRef } from 'react';
import clsx from 'clsx';

import s from './control.scss';
import c from '@/client/scss/utils.scss';
import { Label } from '@/client/components/typography';

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  append?: React.ReactElement<any>;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
  error?: boolean;
  helperText?: string;
}

export const Control = forwardRef(
  (
    { label, id, append, color = 'primary', placeholder = ' ', error, helperText, ...rest }: ControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className={s.container}>
        <div className={clsx(s['form-group'], s[color], { [s.error]: error })}>
          <>
            <input ref={ref} placeholder={placeholder} className={s.input} id={id} {...rest} />
            {label && (
              <Label className={s.label} htmlFor={id}>
                {label}
              </Label>
            )}
            {append && <div className={s.append}>{append}</div>}
          </>
        </div>
        {helperText && <div className={clsx(c['xs:mt-1'], s.helper)}>{helperText}</div>}
      </div>
    );
  }
);
