import React from 'react';

import { RoundCheck } from 'mdi-norm';

import { CheckboxProps } from './index.dto';
import { FormGroup, Label, Wrapper, Input, Icon, Switch } from './styles';

export function Checkbox({ label, id, color = 'secondary', labelPlacement = 'top', ...rest }: CheckboxProps) {
  return (
    <FormGroup labelPlacement={labelPlacement}>
      <>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Wrapper>
          <>
            <Input color={color} id={id} type="checkbox" {...rest} />
            <Switch>
              <Icon as={RoundCheck} />
            </Switch>
          </>
        </Wrapper>
      </>
    </FormGroup>
  );
}
