import React from 'react';

import { Container } from './styles';

export function Label({ children, htmlFor, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <Container htmlFor={htmlFor} {...rest}>
      {children}
    </Container>
  );
}
