import { Formik } from 'formik';
import React from 'react';

import { Button, Title, Overline, FormControl, Form } from '@/client/components';
import c from '@/client/scss/utils.scss';
import { requestLogin } from '@/client/services/ducks/auth';
import { ForgotValidationSchema } from '@/client/services/validations';
import { useThunkDispatch, useTypedSelector } from '@/client/utils';

interface ForgotData {
  email: string;
}

export default function AuthForgot() {
  const authState = useTypedSelector(state => state.auth);
  const dispatch = useThunkDispatch();

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values: ForgotData) => dispatch(requestLogin(values))}
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
