import React from 'react';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';

import { Button, Title, Overline, FormControl, Form } from '@/client/components';
import c from '@/client/scss/utils.scss';
import { ApplicationState } from '@/client/services/ducks';
import { ForgotValidationSchema } from '@/client/services/validations';

interface ForgotData {
  email: string;
}

export default function AuthForgot() {
  const authState = useSelector((state: ApplicationState) => state.Auth);

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values: ForgotData) => console.log(values)} // eslint-disable-line no-console
      validationSchema={ForgotValidationSchema}
    >
      <>
        <Overline>Recuperar Senha</Overline>
        <Title gutterBottom>Vamos te ajudar!</Title>
        <Form statesToValidate={[authState]}>
          <>
            <FormControl name="email" label="Email" id="email" disabled={authState.loading} />
            <div className={c['xs:ta-right']}>
              <Button to="/auth/login" variant="flat" color="secondary">
                Está perdido?
              </Button>{' '}
              <Button type="submit">Recuperar</Button>
            </div>
          </>
        </Form>
      </>
    </Formik>
  );
}
