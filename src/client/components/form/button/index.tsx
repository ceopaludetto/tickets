import React from 'react';

import { Container, ButtonProps } from './styles';

export function Button({ children, size = 'medium', color = 'primary', variant = 'contained', ...rest }: ButtonProps) {
  return (
    <Container forwardedSize={size} color={color} variant={variant} {...rest}>
      {children}
    </Container>
  );
}
