import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { parse } from 'query-string';
import { Typography, Button, IconButton, Link } from '@material-ui/core';

import { Login as LoginDocument, Profile } from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import {
  useVisibility,
  preloadRouteComponent,
  useRouter,
  fieldLevelErrorMapper,
} from '@/client/utils';
import { PrefetchLink, FormikField } from '@/client/components/composed';
import { useStyles } from './styles';

export default function Login() {
  const classes = useStyles();
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
          cache.writeQuery<ProfileQuery>({
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
      <div className={classes.form}>
        <Typography variant="h4">Bem vindo de volta!</Typography>
        <Typography variant="button" gutterBottom color="secondary">
          Entrar
        </Typography>
        <Formik
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
              fieldLevelErrorMapper(err, {
                setFieldError: actions.setFieldError,
              });

              actions.setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              <FormikField name="email" label="Email" id="email" type="email" />
              <FormikField
                name="senha"
                type={visibility ? 'text' : 'password'}
                label="Senha"
                id="senha"
                helperText={
                  <Link
                    component={PrefetchLink}
                    color="secondary"
                    to="/auth/forgot"
                  >
                    Esqueceu a senha?
                  </Link>
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={visibility ? 'Esconder senha' : 'Ver senha'}
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {renderVisibility()}
                    </IconButton>
                  ),
                }}
              />
              <div className={classes.buttonMargin}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disableRipple
                  disableTouchRipple
                  type="submit"
                  fullWidth
                >
                  Entrar
                </Button>
              </div>
              <div className={classes.topOr}>select with languages</div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
