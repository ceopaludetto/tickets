import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useToggle } from 'react-use';

import {
  LoginMutation,
  LoginMutationVariables,
} from '@/client/typescript/graphql';
import { Control, Button, IconButton } from '@/client/components/form';
import { Divider } from '@/client/components/layout';
import { PrefetchLink, Title, SubTitle } from '@/client/components/typo';
import { Login as LoginDocument } from '@/client/graphql/usuario.gql';

export default function Login() {
  const [visibility, toggleVisibility] = useToggle(false);
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
      <Title>Bem vindo</Title>
      <SubTitle>Fazer Login</SubTitle>
      <Control label="Email" id="email" />
      <Control
        type={visibility ? 'text' : 'password'}
        label="Senha"
        id="senha"
        append={
          <IconButton onClick={toggleVisibility}>
            {visibility ? <FiEyeOff /> : <FiEye />}
          </IconButton>
        }
      />
      <Button block onClick={handleLogin}>
        Entrar
      </Button>
      <Divider />
      <PrefetchLink to="/auth/register">Criar conta</PrefetchLink>
    </>
  );
}
