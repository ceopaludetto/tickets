import React, { forwardRef } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import { FormikErrors } from 'formik';

import { Label } from '@/client/components/typo';
import { Root, Container, Input, Append, Prepend, Error } from './styles';

export interface ControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  footer?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: string | FormikErrors<any>;
}

export const Control = forwardRef(
  (
    {
      append,
      prepend,
      label,
      id,
      errors = '',
      required,
      footer,
      ...rest
    }: ControlProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Root>
        <>
          <Row>
            {!!label && (
              <Col col>
                <Label htmlFor={id}>
                  {label}
                  {required && ' *'}
                </Label>
              </Col>
            )}
            {!!errors && (
              <Col col="auto">
                <Error>{errors}</Error>
              </Col>
            )}
          </Row>
          <Container hasError={!!errors}>
            <>
              <Input
                ref={ref}
                id={id}
                append={!!append}
                prepend={!!prepend}
                {...rest}
              />
              {!!append && <Append>{append}</Append>}
              {!!prepend && <Prepend>{prepend}</Prepend>}
            </>
          </Container>
          {!!footer && footer}
        </>
      </Root>
    );
  }
);
