import React, { useState, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { Container, Input, Label, Append, ControlProps } from './styles';

export function Control({ label, id, block, onFocus, onBlur, append, ...rest }: ControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setFocus] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (inputRef.current && inputRef.current.value && !hasFocus) {
      setFocus(true);
    }
  }, [inputRef]);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(true);
    if (onFocus) onFocus(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (inputRef.current && !inputRef.current.value) {
      setFocus(false);
    }
    if (onBlur) onBlur(e);
  }

  return (
    <Container block={block}>
      <>
        {!!label && (
          <Label hasFocus={hasFocus} htmlFor={id}>
            {label}
          </Label>
        )}
        <Input ref={inputRef} hasLabel={!!label} onFocus={handleFocus} onBlur={handleBlur} id={id} {...rest} />
        {!!append && <Append>{append}</Append>}
      </>
    </Container>
  );
}
