import React from 'react';
import { NavLinkProps } from 'react-router-dom';

import { usePreload } from '@/client/utils/usePreload';
import { Item, Icon } from './styles';

interface SidebarItemProps extends NavLinkProps {
  icon?: () => JSX.Element;
}

export function SidebarItem({
  to,
  children,
  onClick,
  icon: IconComponent,
  ...rest
}: SidebarItemProps) {
  const handleClick = usePreload(to as string, onClick);

  return (
    <Item to={to} onClick={handleClick} {...rest}>
      {IconComponent && <Icon>{<IconComponent />}</Icon>}
      {children}
    </Item>
  );
}
