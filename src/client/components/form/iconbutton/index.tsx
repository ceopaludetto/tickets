import React, { cloneElement } from 'react';

import clsx from 'clsx';

import s from './iconbutton.scss';
import { IconButtonProps } from './index.dto';

export function IconButton({ children, color = 'primary', ...rest }: IconButtonProps) {
  return (
    <button className={clsx(s.button, s[color])} {...rest}>
      {cloneElement(children, {
        size: 24,
      })}
    </button>
  );
}
