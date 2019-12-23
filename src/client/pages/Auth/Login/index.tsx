import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

import c from '@/client/scss/utils.scss';
import { Button } from '@/client/components/form';
import { Title, Overline } from '@/client/components/typography';
import { FormControl } from '@/client/components/logic';
import { useVisibility, useThunkDispatch, useTypedSelector } from '@/client/utils';
import { LoginValidationSchema } from '@/client/services/validations/auth/login';
import { requestAuth } from '@/client/services/ducks/auth';

interface LoginData {
  email: string;
  senha: string;
}

export default function AuthLogin() {
  const authState = useTypedSelector(state => state.auth);
  const dispatch = useThunkDispatch();
  const methods = useForm<LoginData>({ validationSchema: LoginValidationSchema });
  const { mapVisibilityProps } = useVisibility();

  const onSubmit = methods.handleSubmit(values => dispatch(requestAuth(values)));

  return (
    <FormContext {...methods}>
      {authState.loading && <div>loading</div>}
      <form onSubmit={onSubmit}>
        <>
          <Overline>Login</Overline>
          <Title gutterBottom>Bem vindo!</Title>
          <FormControl name="email" label="Email" id="email" />
          <FormControl name="senha" label="Senha" id="senha" helperText="Esqueceu a senha?" {...mapVisibilityProps()} />
          <div className={c['xs:ta-right']}>
            <Button to="/auth/register" variant="flat" color="secondary">
              Criar conta
            </Button>{' '}
            <Button type="submit">Entrar</Button>
          </div>
        </>
      </form>
    </FormContext>
  );
}
