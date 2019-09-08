import React from 'react';

import {
  Container,
  Content,
  Icon,
  IconContainer,
  Tail,
  IconProps,
} from './styles';

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  last?: boolean;
  content?: React.ReactNode | string;
  inverted?: boolean;
}

export function Step({
  last,
  status,
  content,
  inverted,
  ...rest
}: StepProps & IconProps) {
  return (
    <Container inverted={inverted} {...rest}>
      <IconContainer>
        <Icon status={status} />
        {!last && <Tail status={status} />}
      </IconContainer>
      <Content>{content}</Content>
    </Container>
  );
}
