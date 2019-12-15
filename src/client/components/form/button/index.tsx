import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
  return <Container {...rest}>{children}</Container>;
}
