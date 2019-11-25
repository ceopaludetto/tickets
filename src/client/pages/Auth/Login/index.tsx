import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet-async';
import { Formik, Form } from 'formik';
import { parse } from 'query-string';
import { Typography, Button, IconButton, Link, Divider } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { Login as LoginDocument, Profile } from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import { useVisibility, preloadRouteComponent, fieldLevelErrorMapper, classValidatorMapper } from '@/client/utils';
import { PrefetchLink, FormikField } from '@/client/components/composed';
import { LoginValidation } from '@/client/providers/validations';
import { useStyles } from './styles';

export default function Login() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const client = useApolloClient();
  const { visibility, toggleVisibility, render: renderVisibility } = useVisibility();

  const [fetchLogin] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
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
  });

  return (
    <>
      <Helmet title="Entrar" />
      <div className={classes.form}>
        <Typography variant="h4">Bem vindo de volta!</Typography>
        <Typography variant="button" gutterBottom color="secondary">
          Entrar
        </Typography>
        <Formik
          validationSchema={LoginValidation}
          validateOnChange={false}
          validateOnBlur={false}
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

              classValidatorMapper<{ email: string; senha: string }>(err, {
                setFieldError: actions.setFieldError,
                maps: {
                  email: 'batata',
                },
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
                  <Link component={PrefetchLink} color="secondary" to="/auth/forgot">
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
                <Button variant="contained" color="primary" type="submit">
                  Entrar
                </Button>
              </div>
              <Divider />
              <div className={classes.topOr}>
                select with languages
                <Link color="secondary" component={PrefetchLink} to="/auth/register">
                  Criar conta
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
