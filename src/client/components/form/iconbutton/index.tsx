import clsx from 'clsx';
import React, { cloneElement } from 'react';

import s from './iconbutton.scss';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<{ size: number }>;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function IconButton({ children, color = 'primary', ...rest }: IconButtonProps) {
  return (
    <button className={clsx(s.button, s[color])} {...rest}>
      {cloneElement(children, {
        size: 20,
      })}
    </button>
  );
}
