import React from 'react';

import { OverlineProps } from './index.dto';
import { Container } from './styles';

export function Overline({ children, gutterBottom = false, ...rest }: OverlineProps) {
  return (
    <Container gutterBottom={gutterBottom} {...rest}>
      {children}
    </Container>
  );
}
