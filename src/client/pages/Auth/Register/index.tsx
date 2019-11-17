import React, { useState, useMemo } from 'react';
import { Button, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { Formik, Form, FormikErrors } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { parse } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import UseKey from 'react-use/lib/comps/UseKey';

import { RegisterValidation } from '@/client/providers/validations';
import { classValidatorMapper, preloadRouteComponent } from '@/client/utils';
import { Register as RegisterDocument, Profile } from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import { AddEmpresa } from '@/client/graphql/empresa.gql';
import { CustomStepConnector, CustomStepIcon } from '@/client/components/customs';
import { useStyles } from './styles';
import { RenderStep } from './render';

interface Fields {
  nome?: string;
  email?: string;
  sobrenome?: string;
  telefone?: string;
  nascimento?: Date;
  senha?: string;
  rsenha?: string;
  hasEmpresa?: boolean;
  cnpj?: string;
  nomeFantasia?: string;
}

export default function Register() {
  const classes = useStyles();
  const client = useApolloClient();
  const location = useLocation();
  const history = useHistory();
  const [currentPage, setPage] = useState(0);

  const steps = ['Usuário', 'Senha', 'Empresa'];
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
  const isLastPage = useMemo(() => currentPage === 2, [currentPage]);

  const [fetchEmpresa] = useMutation<AddEmpresaMutation, AddEmpresaMutationVariables>(AddEmpresa);
  const [fetchRegister] = useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, {
    update(cache, { data }) {
      if (data && data.register) {
        cache.writeQuery<ProfileQuery>({
          query: Profile,
          data: {
            profile: data.register,
          },
        });
      }
    },
  });

  function handlePageValidation(
    validateForm: () => Promise<FormikErrors<Fields>>,
    submitForm: () => void,
    setFieldTouched: (fields: keyof Fields, isTouched?: boolean, shouldValidate?: boolean) => void
  ) {
    return async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const errors = await validateForm();
      const errorKeys = Object.keys(errors) as (keyof Fields)[];
      if (errors && errorKeys.length) {
        errorKeys.forEach(error => setFieldTouched(error, true, false));
        if (errors.nome || errors.email || errors.sobrenome || errors.telefone || errors.nascimento) {
          return setPage(0);
        }
        if (errors.senha || errors.rsenha) {
          return setPage(1);
        }
        return setPage(2);
      }
      return submitForm();
    };
  }

  function handleNext(e: React.MouseEvent) {
    e.preventDefault();
    setPage(currentPage + 1);
  }

  function handleBefore(e: React.MouseEvent) {
    e.preventDefault();
    setPage(currentPage - 1);
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className={classes.root}>
        <Typography variant="h4">Bem vindo!</Typography>
        <Typography variant="button" gutterBottom color="secondary">
          Cadastro
        </Typography>
        <div className={classes.stepperRoot}>
          <Stepper activeStep={currentPage} connector={<CustomStepConnector />}>
            {steps.map(s => (
              <Step key={s}>
                <StepLabel StepIconComponent={CustomStepIcon}>{s}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <Formik
          validationSchema={RegisterValidation}
          initialValues={{
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            nascimento: new Date(),
            hasEmpresa: false,
            cnpj: '',
            cep: '',
            empresaEmail: '',
            empresaTelefone: '',
            nomeCompleto: '',
            nomeFantasia: '',
            razaoSocial: '',
            endereco: '',
            site: '',
            senha: '',
            rsenha: '',
          }}
          onSubmit={async (
            {
              hasEmpresa,
              nome,
              sobrenome,
              email,
              senha,
              telefone,
              nascimento,
              rsenha,
              empresaTelefone,
              empresaEmail,
              ...rest
            },
            { setErrors, setFieldError }
          ) => {
            if (senha !== rsenha) {
              setErrors({
                rsenha: 'As senhas não coincidem',
              });
            }
            try {
              await fetchRegister({
                variables: {
                  input: {
                    nome,
                    sobrenome,
                    email,
                    senha,
                    telefone,
                    nascimento,
                  },
                },
              });
              if (hasEmpresa) {
                try {
                  await fetchEmpresa({
                    variables: {
                      input: {
                        email: empresaEmail,
                        telefone: empresaTelefone,
                        ...rest,
                      },
                    },
                  });
                } catch (err) {
                  console.log(err); // eslint-disable-line
                  classValidatorMapper(err, {
                    setFieldError,
                    maps: {
                      email: 'empresaEmail',
                      telefone: 'empresaTelefone',
                    },
                  });
                }
              }
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
              classValidatorMapper(err, {
                setFieldError,
              });
            }
          }}
        >
          {({ validateForm, submitForm, setFieldTouched }) => (
            <Form>
              <UseKey
                filter="Enter"
                fn={isLastPage ? handlePageValidation(validateForm, submitForm, setFieldTouched) : handleNext}
                deps={[currentPage]}
              />
              <RenderStep currentPage={currentPage} />
              <div className={classes.buttons}>
                {!isFirstPage && (
                  <Button type="button" onClick={handleBefore} color="secondary">
                    Voltar
                  </Button>
                )}
                {isLastPage ? (
                  <Button
                    type="submit"
                    onClick={handlePageValidation(validateForm, submitForm, setFieldTouched)}
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                ) : (
                  <Button onClick={handleNext} type="button" variant="contained" color="primary">
                    Próximo
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
