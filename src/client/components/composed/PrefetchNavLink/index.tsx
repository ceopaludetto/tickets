import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { usePreload } from '@/client/utils';

export const PrefetchNavLink = forwardRef((
  { to, onClick, children, ...rest }: NavLinkProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<NavLink<any>>
) => {
  const handleClick = usePreload(to as string, onClick);

  return (
    <NavLink ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </NavLink>
  );
});
