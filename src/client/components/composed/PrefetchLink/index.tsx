import React, { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useEnsuredForwardedRef } from 'react-use';

import { usePreload } from '@/client/utils';

export const PrefetchLink = forwardRef(
  (
    { to, onClick, children, ...rest }: LinkProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.Ref<Link<any>>
  ) => {
    const ensuredRef = useEnsuredForwardedRef(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref as React.MutableRefObject<Link<any>>
    );
    const handleClick = usePreload(to as string, onClick);

    return (
      <Link ref={ensuredRef} to={to} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }
);
