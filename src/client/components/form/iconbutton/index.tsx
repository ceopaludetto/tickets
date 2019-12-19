import React, { cloneElement } from 'react';

import { Container, IconButtonProps } from './styles';

const mapIconSize = {
  small: 17,
  medium: 20,
  large: 25,
};

export function IconButton({ children, size = 'medium', color = 'primary', ...rest }: IconButtonProps) {
  return (
    <Container forwardedSize={size} color={color} {...rest}>
      {cloneElement(children, {
        size: mapIconSize[size],
      })}
    </Container>
  );
}
