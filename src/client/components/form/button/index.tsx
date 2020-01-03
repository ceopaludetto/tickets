import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { usePreload } from '@/client/utils';

import s from './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

interface PrefetchLinkProps extends LinkProps {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: PrefetchLinkProps): JSX.Element;
};

export const Button: Overload = ({ onClick, className, ...rest }: ButtonProps | PrefetchLinkProps) => {
  const { handleClick } = usePreload((rest as PrefetchLinkProps).to as string, onClick as any);

  if ('to' in rest) {
    const { children, variant = 'contained', color = 'primary', to, ...other } = rest;
    return (
      <Link to={to} onClick={handleClick as any} className={clsx(s.button, s[variant], s[color], className)} {...other}>
        {children}
      </Link>
    );
  }

  const { children, variant = 'contained', color = 'primary', type = 'button', ...other } = rest;
  return (
    <button
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      type={type}
      className={clsx(s.button, s[variant], s[color], className)}
      {...other}
    >
      {children}
    </button>
  );
};
