import React, { forwardRef } from 'react';

import { Container, Item, GridItemProps } from './styles';

export const Grid = forwardRef(
  ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  )
);

export const GridItem = ({ size, children, ...rest }: GridItemProps) => (
  <Item size={size} {...rest}>
    {children}
  </Item>
);
