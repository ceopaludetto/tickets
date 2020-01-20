import React from 'react';

import { TitleProps } from './index.dto';
import { Container } from './styles';

export function Title({ children, gutterBottom = false, ...rest }: TitleProps) {
  return (
    <Container gutterBottom={gutterBottom} {...rest}>
      {children}
    </Container>
  );
}
