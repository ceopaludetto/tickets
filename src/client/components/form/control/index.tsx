import React from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import { FormikErrors } from 'formik';

import { Label } from '@/client/components/typo';
import { Root, Container, Input, Append, Prepend, Error } from './styles';

export interface ControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode | string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: string | FormikErrors<any>;
}

export function Control({
  append,
  prepend,
  label,
  id,
  errors = '',
  required,
  ...rest
}: ControlProps) {
  return (
    <Root>
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
          <Input id={id} append={!!append} prepend={!!prepend} {...rest} />
          {!!append && <Append>{append}</Append>}
          {!!prepend && <Prepend>{prepend}</Prepend>}
        </>
      </Container>
    </Root>
  );
}
