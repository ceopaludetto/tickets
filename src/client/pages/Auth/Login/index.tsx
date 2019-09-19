import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { parse } from 'query-string';

import {
  LoginMutation,
  LoginMutationVariables,
  LoggedQuery,
  ProfileQuery,
  ProfileQueryVariables,
} from '@/client/typescript/graphql';
import { Button, IconButton } from '@/client/components/form';
import { Divider, TextAlign } from '@/client/components/layout';
import {
  PrefetchLink,
  Title,
  SubTitle,
  Primary,
} from '@/client/components/typo';
import { FormikControl } from '@/client/components/formik';
import { Login as LoginDocument, Profile } from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import {
  useVisibility,
  preloadRouteComponent,
  useRouter,
} from '@/client/utils';
import { LoginValidation } from '@/client/providers/validations';

export default function Login() {
  const { location, history } = useRouter();
  const client = useApolloClient();
  const {
    visibility,
    toggleVisibility,
    render: renderVisibility,
  } = useVisibility();

  const [fetchLogin] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    {
      update(cache, { data }) {
        if (data && data.login) {
          cache.writeQuery<ProfileQuery, ProfileQueryVariables>({
            query: Profile,
            data: {
              profile: data.login,
            },
          });
        }
      },
    }
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

            const route = (parse(location.search).from as string) || '/app';

            await preloadRouteComponent(route, client);

            history.push({
              pathname: route,
            });
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
            <FormikControl name="email" label="Email" id="email" type="email" />
            <FormikControl
              name="senha"
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
