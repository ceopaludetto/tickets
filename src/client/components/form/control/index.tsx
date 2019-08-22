import React from 'react';

import { Root, Container, Input, Append, Prepend, Label } from './styles';

interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
}

export function Control({ append, prepend, label, id, ...rest }: ControlProps) {
  return (
    <Root>
      <>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Container>
          <>
            <Input id={id} append={!!append} prepend={!!prepend} {...rest} />
            {!!append && <Append>{append}</Append>}
            {!!prepend && <Prepend>{prepend}</Prepend>}
          </>
        </Container>
      </>
    </Root>
  );
}
