import React, { forwardRef, cloneElement } from 'react';
import MaskInput, { MaskedInputProps } from 'react-text-mask';
import clsx from 'clsx';

import s from './control.scss';
import c from '@/client/scss/utils.scss';
import { Label } from '@/client/components/typography';

export interface ControlProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Pick<MaskedInputProps, 'guide' | 'mask' | 'placeholderChar' | 'keepCharPositions' | 'pipe' | 'showMask'> {
  label?: string;
  append?: React.ReactElement<any>;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
  error?: boolean;
  helperText?: React.ReactNode;
}

export const Control = forwardRef(
  (
    {
      label,
      id,
      append,
      color = 'primary',
      placeholder = ' ',
      mask,
      placeholderChar,
      pipe,
      keepCharPositions,
      guide,
      showMask,
      disabled,
      error,
      required,
      helperText,
      ...rest
    }: ControlProps,
    ref: React.Ref<HTMLInputElement> | React.Ref<MaskInput>
  ) => {
    return (
      <div className={s.container}>
        <div className={clsx(s['form-group'], s[color], { [s.error]: error, [s.disabled]: disabled })}>
          <>
            {mask ? (
              <MaskInput
                mask={mask}
                guide={guide}
                showMask={showMask}
                placeholderChar={placeholderChar}
                pipe={pipe}
                keepCharPositions={keepCharPositions}
                ref={ref as React.Ref<MaskInput>}
                {...rest}
                render={(innerRef, innerProps) => (
                  <input
                    ref={innerRef}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={s.input}
                    id={id}
                    {...innerProps}
                  />
                )}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                placeholder={placeholder}
                disabled={disabled}
                className={s.input}
                id={id}
                {...rest}
              />
            )}
            {label && (
              <Label className={s.label} htmlFor={id}>
                {label}
                {required && '*'}
              </Label>
            )}
            {append && <div className={s.append}>{cloneElement(append, { disabled })}</div>}
          </>
        </div>
        {helperText && <div className={clsx(c['xs:mt-1'], s.helper)}>{helperText}</div>}
      </div>
    );
  }
);
