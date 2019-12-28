import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

import c from '@/client/scss/utils.scss';
import { Button, Title, Overline, FormControl, Form } from '@/client/components';
import { useThunkDispatch, useTypedSelector } from '@/client/utils';
import { LoginValidationSchema } from '@/client/services/validations/auth/login';
import { requestLogin } from '@/client/services/ducks/auth';

interface LoginData {
  email: string;
  senha: string;
}

export default function AuthLogin() {
  const authState = useTypedSelector(state => state.auth);
  const dispatch = useThunkDispatch();
  const methods = useForm<LoginData>({ validationSchema: LoginValidationSchema });

  const onSubmit = methods.handleSubmit(values => dispatch(requestLogin(values)));

  return (
    <FormContext {...methods}>
      <>
        <Overline>Recuperar Senha</Overline>
        <Title gutterBottom>Vamos te ajudar!</Title>
        <Form statesToValidate={[authState]} onSubmit={onSubmit}>
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
    </FormContext>
  );
}
