import React, { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { usePreload } from '@/client/utils';

export const PrefetchLink = forwardRef(
  (
    { to, onClick, children, ...rest }: LinkProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.Ref<Link<any>>
  ) => {
    const handleClick = usePreload(to as string, onClick);

    return (
      <Link ref={ref} to={to} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }
);
