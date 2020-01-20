import React from 'react';

import { ListProps, ListItemProps } from './index.dto';
import { Container, Item } from './styles';

export function List({ children, gutterBottom = false, ...rest }: ListProps) {
  return (
    <Container gutterBottom={gutterBottom} {...rest}>
      {children}
    </Container>
  );
}

List.Item = ({ children, disabled, ...rest }: ListItemProps) => {
  return (
    <Item disabled={disabled} {...rest}>
      {children}
    </Item>
  );
};
