import React from 'react';
import { NavLinkProps } from 'react-router-dom';

import { NavItem } from './style';
import { usePreload } from '@/client/utils/usePreload';

export function TabBarItem({ to, onClick, children, ...rest }: NavLinkProps) {
  const handleClick = usePreload(to as string, onClick);

  return (
    <NavItem to={to} onClick={handleClick} {...rest}>
      {children}
    </NavItem>
  );
}
