import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';

import {
  LoginMutation,
  LoginMutationVariables,
} from '@/client/typescript/graphql';
import { Control, Button, IconButton } from '@/client/components/form';
import { Divider } from '@/client/components/layout';
import { PrefetchLink, Title, SubTitle } from '@/client/components/typo';
import { Login as LoginDocument } from '@/client/graphql/usuario.gql';
import { useVisibility } from '@/client/utils/useVisibility';

export default function Login() {
  const {
    visibility,
    toggleVisibility,
    render: renderVisibility,
  } = useVisibility();
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
      <Helmet title="Entrar" />
      <SubTitle>Fazer Login</SubTitle>
      <Title>Bem vindo</Title>
      <Control label="Email" id="email" />
      <Control
        type={visibility ? 'text' : 'password'}
        label="Senha"
        id="senha"
        append={
          <IconButton
            aria-label={visibility ? 'Esconder senha' : 'Ver senha'}
            onClick={toggleVisibility}
          >
            {renderVisibility()}
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
