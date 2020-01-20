import React, { cloneElement } from 'react';

import { IconButtonProps } from './index.dto';
import { Container } from './styles';

export function IconButton({ children, color = 'primary', ...rest }: IconButtonProps) {
  return (
    <Container color={color} {...rest}>
      {cloneElement(children, {
        size: 24,
      })}
    </Container>
  );
}
