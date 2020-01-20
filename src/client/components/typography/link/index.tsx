import React from 'react';

import { usePreload } from '@/client/utils';

import { LinkProps } from './index.dto';
import { Container } from './styles';

export function Link({ children, gutterBottom, color = 'primary', to, onClick, ...rest }: LinkProps) {
  const { handleClick } = usePreload(to as string, onClick);

  return (
    <Container to={to} onClick={handleClick as any} gutterBottom={gutterBottom} color={color} {...rest}>
      {children}
    </Container>
  );
}
