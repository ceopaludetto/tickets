import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  LoginMutation,
  LoginMutationVariables,
} from '@/client/typescript/graphql';

import { Control, Button } from '@/client/components/form';
import { Divider } from '@/client/components/layout';
import { Login as LoginDocument } from '@/client/graphql/usuario.gql';

export default function Login() {
  const [fetchLogin] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument
  );

  function handleLogin() {
    fetchLogin({
      variables: {
        email: 'ceo.paludetto@gmail.com',
        senha: 'R7soltaosuave',
      },
    });
  }

  return (
    <>
      <Control label="Email" id="email" />
      <Control label="Senha" id="senha" append={<span>teste</span>} />
      <Button block onClick={handleLogin}>
        Entrar
      </Button>
      <Divider />
    </>
  );
}
