import React from 'react';

import { FlexProps, FlexItemProps } from './index.dto';
import { Row, Col } from './styles';

export function Flex({
  children,
  alignItems = { xs: 'flex-start' },
  justifyContent = { xs: 'flex-start' },
  flexWrap = { xs: 'wrap' },
  ...rest
}: FlexProps) {
  return (
    <Row alignItems={alignItems} justifyContent={justifyContent} flexWrap={flexWrap} {...rest}>
      {children}
    </Row>
  );
}

Flex.Item = ({ children, size, ...rest }: FlexItemProps) => (
  <Col size={size} {...rest}>
    {children}
  </Col>
);
