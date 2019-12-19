import React, { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { Container, Input, ControlProps, Label } from './styles';

export function Control({ label, id, block, ...rest }: ControlProps) {
  const [value, setValue] = useState('');
  const [hasFocus, setFocus] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (value && !hasFocus) {
      setFocus(true);
    }
  }, [value]);

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    if (!value) {
      setFocus(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <Container block={block}>
      <>
        {!!label && (
          <Label hasFocus={hasFocus} htmlFor={id}>
            {label}
          </Label>
        )}
        <Input
          hasLabel={!!label}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={id}
          {...rest}
        />
      </>
    </Container>
  );
}
