import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { usePreload } from '@/client/utils';

import s from './index.scss';

interface LinkProps extends RouterLinkProps {
  gutterBottom?: boolean;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export function Link({ children, gutterBottom, color = 'primary', to, onClick, ...rest }: LinkProps) {
  const { handleClick } = usePreload(to as string, onClick);

  return (
    <RouterLink
      to={to}
      onClick={handleClick as any}
      className={clsx(s.link, s[color], { [s['gutter-bottom']]: gutterBottom })}
      {...rest}
    >
      {children}
    </RouterLink>
  );
}
