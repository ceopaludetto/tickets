import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field } from 'formik';

import {
  LoginMutation,
  LoginMutationVariables,
  LoggedQuery,
} from '@/client/typescript/graphql';
import { Button, IconButton } from '@/client/components/form';
import { Divider, TextAlign } from '@/client/components/layout';
import {
  PrefetchLink,
  Title,
  SubTitle,
  Primary,
} from '@/client/components/typo';
import { FormikControl } from '@/client/components/composed';
import { Login as LoginDocument } from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import { useVisibility, preloadRouteComponent } from '@/client/utils';
import { LoginValidation } from '@/client/providers/validations';

export default function Login() {
  const client = useApolloClient();
  const {
    visibility,
    toggleVisibility,
    render: renderVisibility,
  } = useVisibility();

  const [fetchLogin] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument
  );

  return (
    <>
      <Helmet title="Entrar" />
      <SubTitle>Fazer Login</SubTitle>
      <Title>Bem vindo</Title>
      <Formik
        validationSchema={LoginValidation}
        initialValues={{
          email: '',
          senha: '',
        }}
        onSubmit={async ({ email, senha }, actions) => {
          try {
            await fetchLogin({
              variables: {
                email,
                senha,
              },
            });

            client.writeQuery<LoggedQuery>({
              query: Logged,
              data: {
                logged: true,
              },
            });

            await preloadRouteComponent('/app', client);
          } catch (err) {
            const firstError = err.graphQLErrors[0];

            if (firstError && firstError.extensions) {
              const { field } = firstError.extensions.exception;

              actions.setErrors({
                [field]: firstError.message,
              });
            }
          }
        }}
      >
        {() => (
          <Form>
            <Field
              name="email"
              component={FormikControl}
              label="Email"
              id="email"
              type="email"
            />
            <Field
              name="senha"
              component={FormikControl}
              type={visibility ? 'text' : 'password'}
              label="Senha"
              id="senha"
              append={
                <IconButton
                  aria-label={visibility ? 'Esconder senha' : 'Ver senha'}
                  type="button"
                  onClick={toggleVisibility}
                >
                  {renderVisibility()}
                </IconButton>
              }
            />
            <Button type="submit" block>
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
      <Divider doubleMargin={false} />
      <TextAlign align="center">
        <PrefetchLink to="/auth/register">Criar conta</PrefetchLink>{' '}
        <Primary>&#8226;</Primary>{' '}
        <PrefetchLink to="/auth/forgot">Esqueceu a senha</PrefetchLink>
      </TextAlign>
    </>
  );
}
