import React from 'react';
import { FormikErrors } from 'formik';
import { FiCheck, FiMinus } from 'react-icons/fi';

import { Root, Check, Input, Container, CustomLabel } from './styles';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  indeterminate?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: string | FormikErrors<any>;
}

export function Checkbox({
  label,
  id,
  checked,
  indeterminate = false,
  ...rest
}: CheckboxProps) {
  return (
    <Root>
      <Container>
        <>
          <Input
            // eslint-disable-next-line no-return-assign
            ref={el => el && (el.indeterminate = indeterminate)}
            id={id}
            checked={checked}
            type="checkbox"
            {...rest}
          />
          <CustomLabel htmlFor={id}>{label}</CustomLabel>
          <Check htmlFor={id} role="button">
            {checked && !indeterminate && <FiCheck strokeWidth={3} />}
            {indeterminate && <FiMinus strokeWidth={3} />}
          </Check>
        </>
      </Container>
    </Root>
  );
}
