import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Link } from '../Link';
import { useRouter } from '@/client/utils/useRouter';
import { preloadRouteComponent } from '@/client/utils/preloadRouteComponent';

export function PrefetchLink({ to, onClick, ...rest }: LinkProps) {
  const { history } = useRouter();

  async function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();

    await preloadRouteComponent(to as string);
    history.push({
      pathname: to as string,
    });

    if (onClick) {
      onClick(e);
    }
  }

  return <Link to={to} onClick={handleClick} {...rest} />;
}
