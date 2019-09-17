import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'styled-bootstrap-grid';
import { FiUser, FiLock, FiGlobe } from 'react-icons/fi';
import { Formik, Form, FormikErrors } from 'formik';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { parse } from 'query-string';
import UseKey from 'react-use/lib/comps/UseKey';

import { Button } from '@/client/components/form';
import {
  Title,
  SubTitle,
  PrefetchLink,
  Primary,
} from '@/client/components/typo';
import { TextAlign, Divider } from '@/client/components/layout';
import { Stepper } from '@/client/components/composed';
import { RegisterValidation } from '@/client/providers/validations';
import {
  useMultipleVisibility,
  classValidatorMapper,
  preloadRouteComponent,
  useRouter,
} from '@/client/utils';
import {
  Register as RegisterDocument,
  Profile,
} from '@/client/graphql/usuario.gql';
import { Logged } from '@/client/graphql/local.gql';
import { AddEmpresa } from '@/client/graphql/empresa.gql';
import {
  RegisterMutation,
  RegisterMutationVariables,
  AddEmpresaMutation,
  AddEmpresaMutationVariables,
  ProfileQuery,
  ProfileQueryVariables,
  LoggedQuery,
  LoggedQueryVariables,
} from '@/client/typescript/graphql';
import { renderForm } from './render';

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
  const client = useApolloClient();
  const { history, location } = useRouter();
  const [currentPage, setPage] = useState(0);
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
  const isLastPage = useMemo(() => currentPage === 2, [currentPage]);
  const [fetchEmpresa] = useMutation<
    AddEmpresaMutation,
    AddEmpresaMutationVariables
  >(AddEmpresa);
  const [fetchRegister] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, {
    update(cache, { data }) {
      if (data && data.register) {
        cache.writeQuery<ProfileQuery, ProfileQueryVariables>({
          query: Profile,
          data: {
            profile: data.register,
          },
        });
      }
    },
  });

  const { render: renderVisibility, toggleVisibility } = useMultipleVisibility<
    ('senha' | 'rsenha')[]
  >(['senha', 'rsenha']);

  function handlePage(page: number) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      return setPage(page);
    };
  }

  function handlePageValidation(
    validateForm: () => Promise<FormikErrors<Fields>>,
    submitForm: () => void,
    setFieldTouched: (
      fields: keyof Fields,
      isTouched?: boolean,
      shouldValidate?: boolean
    ) => void
  ) {
    return async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const errors = await validateForm();
      const errorKeys = Object.keys(errors) as (keyof Fields)[];
      if (errors && errorKeys.length) {
        errorKeys.forEach(error => setFieldTouched(error, true, false));

        if (errors.nome || errors.email || errors.sobrenome) {
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

  return (
    <>
      <Helmet title="Cadastro" />
      <Container fluid>
        <SubTitle>Criação de Usuário</SubTitle>
        <Title>Nova conta</Title>
        <Stepper
          inverted
          currentPage={currentPage}
          onStepClick={current => setPage(current)}
          steps={[
            {
              name: 'Usuário',
              icon: FiUser,
            },
            {
              name: 'Senha',
              icon: FiLock,
            },
            {
              name: 'Empresa',
              icon: FiGlobe,
            },
          ]}
        />
        <Formik
          validationSchema={RegisterValidation}
          initialValues={{
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            telefone: '',
            nascimento: new Date(),
            rsenha: '',
            hasEmpresa: false,
            cnpj: '',
            nomeFantasia: '',
            razaoSocial: '',
            nomeCompleto: '',
            empresaEmail: '',
            empresaTelefone: '',
            endereco: '',
            cep: '',
            site: '',
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
                rsenha: 'As senhas não condizem',
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

                  client.writeQuery<LoggedQuery, LoggedQueryVariables>({
                    query: Logged,
                    data: {
                      logged: true,
                    },
                  });
                } catch (err) {
                  classValidatorMapper(err, {
                    setFieldError,
                    maps: {
                      email: 'empresaEmail',
                      telefone: 'empresaTelefone',
                    },
                  });
                }
              }

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
          {({
            validateForm,
            submitForm,
            setFieldTouched,
            setFieldValue,
            values,
          }) => (
            <Form>
              <>
                {renderForm(currentPage, values.hasEmpresa, {
                  renderVisibility,
                  toggleVisibility,
                  setFieldValue,
                  setFieldTouched,
                })}
                <UseKey
                  filter="Enter"
                  fn={
                    isLastPage
                      ? handlePageValidation(
                          validateForm,
                          submitForm,
                          setFieldTouched
                        )
                      : handlePage(currentPage + 1)
                  }
                  deps={[currentPage]}
                />
                <TextAlign align="right">
                  {!isFirstPage && (
                    <Button
                      type="button"
                      variant="text"
                      onClick={handlePage(currentPage - 1)}
                    >
                      Voltar
                    </Button>
                  )}{' '}
                  {isLastPage ? (
                    <Button
                      type="submit"
                      onClick={handlePageValidation(
                        validateForm,
                        submitForm,
                        setFieldTouched
                      )}
                    >
                      Finalizar
                    </Button>
                  ) : (
                    <Button type="button" onClick={handlePage(currentPage + 1)}>
                      Próximo
                    </Button>
                  )}
                </TextAlign>
              </>
            </Form>
          )}
        </Formik>
        <Divider doubleMargin={false} />
        <TextAlign align="center">
          <PrefetchLink to="/auth/login">Já possui uma conta?</PrefetchLink>{' '}
          <Primary>&#8226;</Primary>{' '}
          <PrefetchLink to="/terms">Termos e condições</PrefetchLink>
        </TextAlign>
      </Container>
    </>
  );
}
