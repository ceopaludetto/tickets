import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Link } from '../Link';
import { usePreload } from '@/client/utils/usePreload';

export function PrefetchLink({ to, onClick, ...rest }: LinkProps) {
  const handleClick = usePreload(to as string, onClick);

  return <Link to={to} onClick={handleClick} {...rest} />;
}
