import React from 'react';

import { Label } from '@/client/components/typo';
import { Root, Container, SwitchContainer, Input } from './styles';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  content?: string;
}

export function Switch({ id, label, content, checked, ...rest }: SwitchProps) {
  return (
    <Root>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Container>
        <>
          <Input id={id} checked={checked} type="checkbox" {...rest} />
          <SwitchContainer htmlFor={id} role="button">
            {content}
          </SwitchContainer>
        </>
      </Container>
    </Root>
  );
}
