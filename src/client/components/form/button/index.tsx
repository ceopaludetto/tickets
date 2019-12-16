import React from 'react';

import { Container, ButtonProps } from './styles';

export function Button({ children, ...rest }: ButtonProps) {
  return <Container {...rest}>{children}</Container>;
}
