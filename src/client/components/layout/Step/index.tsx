import React from 'react';
import { IconType } from 'react-icons';

import { Container, Content, Icon, Tail, StatusProp } from './styles';

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  last?: boolean;
  content?: React.ReactNode | string;
  inverted?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any) => void;
  icon: IconType;
}

export function Step({
  last,
  status,
  content,
  inverted,
  onClick,
  icon: IconElement,
  ...rest
}: StepProps & StatusProp) {
  return (
    <>
      <Container
        onClick={onClick}
        role="button"
        aria-label={content as string}
        inverted={inverted}
        {...rest}
      >
        <Icon status={status}>
          <IconElement size={24} />
        </Icon>
        <Content onClick={onClick} status={status}>
          {content}
        </Content>
      </Container>
      {!last && <Tail status={status} />}
    </>
  );
}
