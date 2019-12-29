import React from 'react';
import { Formik } from 'formik';

import c from '@/client/scss/utils.scss';
import { Button, Title, Overline, FormControl, Form, Link } from '@/client/components';
import { useVisibility, useThunkDispatch, useTypedSelector } from '@/client/utils';
import { LoginValidationSchema } from '@/client/services/validations';
import { requestLogin } from '@/client/services/ducks/auth';

interface LoginData {
  email: string;
  senha: string;
}

export default function AuthLogin() {
  const authState = useTypedSelector(state => state.auth);
  const dispatch = useThunkDispatch();
  const { mapVisibilityProps } = useVisibility();

  return (
    <Formik
      onSubmit={(values: LoginData) => dispatch(requestLogin(values))}
      initialValues={{ email: '', senha: '' }}
      validationSchema={LoginValidationSchema}
    >
      <>
        <Overline>Login</Overline>
        <Title gutterBottom>Bem vindo!</Title>
        <Form statesToValidate={[authState]}>
          <>
            <FormControl disabled={authState.loading} name="email" label="Email" id="email" />
            <FormControl
              name="senha"
              label="Senha"
              id="senha"
              helperText={
                <Link color="secondary" to="/auth/forgot">
                  Esqueceu a senha?
                </Link>
              }
              disabled={authState.loading}
              {...mapVisibilityProps()}
            />
            <div className={c['xs:ta-right']}>
              <Button to="/auth/register" variant="flat" color="secondary">
                Criar conta
              </Button>{' '}
              <Button type="submit">Entrar</Button>
            </div>
          </>
        </Form>
      </>
    </Formik>
  );
}
