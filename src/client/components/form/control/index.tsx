import React, { forwardRef, cloneElement } from 'react';
import MaskInput from 'react-text-mask';

import { ControlProps } from './index.dto';
import { Container, FormGroup, Input, Label, Helper, Append } from './styles';

export const Control = forwardRef(
  (
    {
      label,
      id,
      append,
      color = 'primary',
      placeholder = ' ',
      mask,
      placeholderChar,
      pipe,
      keepCharPositions,
      guide,
      showMask,
      disabled,
      error,
      required,
      helperText,
      ...rest
    }: ControlProps,
    ref: React.Ref<HTMLInputElement> | React.Ref<MaskInput>
  ) => {
    return (
      <Container>
        <FormGroup color={color} noLabel={!label} disabled={!!disabled} error={error}>
          <>
            {mask ? (
              <MaskInput
                mask={mask}
                guide={guide}
                showMask={showMask}
                placeholderChar={placeholderChar}
                pipe={pipe}
                keepCharPositions={keepCharPositions}
                ref={ref as React.Ref<MaskInput>}
                {...rest}
                render={(innerRef, innerProps) => (
                  <Input ref={innerRef} placeholder={placeholder} disabled={disabled} id={id} {...innerProps} />
                )}
              />
            ) : (
              <Input
                ref={ref as React.Ref<HTMLInputElement>}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
                {...rest}
              />
            )}
            {label && (
              <Label htmlFor={id}>
                {label}
                {required && '*'}
              </Label>
            )}
            {append && <Append>{cloneElement(append, { disabled })}</Append>}
          </>
        </FormGroup>
        {helperText && <Helper>{helperText}</Helper>}
      </Container>
    );
  }
);
