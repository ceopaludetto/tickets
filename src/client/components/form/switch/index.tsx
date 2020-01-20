import React from 'react';

import { SwitchProps } from './index.dto';
import { Container, Label, Input, Switch as StyledSwitch, Wrapper } from './styles';

export function Switch({ color = 'primary', label, id, ...rest }: SwitchProps) {
  return (
    <Container>
      <>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Wrapper>
          <>
            <Input color={color} id={id} type="checkbox" {...rest} />
            <StyledSwitch />
          </>
        </Wrapper>
      </>
    </Container>
  );
}
