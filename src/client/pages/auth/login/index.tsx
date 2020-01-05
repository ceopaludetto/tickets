import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useFormik, FormikContext } from 'formik';

import { Button, Title, Overline, FormControl, Form, Link } from '@/client/components';
import u from '@/client/scss/utils.scss';
import { ApplicationState, AuthActions } from '@/client/services/ducks';
import { LoginValidationSchema } from '@/client/services/validations';
import { useVisibility, useQueryParameter } from '@/client/utils';

interface LoginData {
  email: string;
  senha: string;
}

export default function AuthLogin() {
  const authState = useSelector((state: ApplicationState) => state.Auth);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { mapVisibilityProps } = useVisibility();
  const formik = useFormik({
    onSubmit: (values: LoginData) => {
      dispatch(AuthActions.loginRequest(values));
    },
    initialValues: { email: '', senha: '' },
    validationSchema: LoginValidationSchema,
  });
  const parsed = useQueryParameter();

  useEffect(() => {
    if (authState.data) {
      if (parsed.from) {
        push(parsed.from as string);
      } else {
        push('/app');
      }
    }
  }, [authState]);

  return (
    <FormikContext.Provider value={formik}>
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
            <div className={u['xs:ta-right']}>
              <Button to="/auth/register" variant="flat" color="secondary">
                Criar conta
              </Button>{' '}
              <Button type="submit">Entrar</Button>
            </div>
          </>
        </Form>
      </>
    </FormikContext.Provider>
  );
}
