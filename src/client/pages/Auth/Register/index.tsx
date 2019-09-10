import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'styled-bootstrap-grid';
import { FiUser, FiLock, FiGlobe } from 'react-icons/fi';
import { Formik, Field, Form } from 'formik';
import UseKey from 'react-use/lib/comps/UseKey';

import { Button, IconButton } from '@/client/components/form';
import { Title, SubTitle } from '@/client/components/typo';
import { TextAlign } from '@/client/components/layout';
import { Stepper, FormikControl } from '@/client/components/composed';
import { RegisterValidation } from '@/client/providers/validations';
import { useMultipleVisibility } from '@/client/utils';

interface Fields {
  nome?: string;
  email?: string;
  sobrenome?: string;
  senha?: string;
  rsenha?: string;
}

export default function Register() {
  const [currentPage, setPage] = useState(0);
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
  const isLastPage = useMemo(() => currentPage === 2, [currentPage]);

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
    validateForm: () => Promise<Fields>,
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

  function renderForm(page: number) {
    if (page === 0) {
      return (
        <>
          <Field
            required
            name="nome"
            label="Nome"
            id="name"
            component={FormikControl}
          />
          <Field
            name="sobrenome"
            label="Sobrenome"
            id="lastname"
            required
            component={FormikControl}
          />
          <Field
            name="email"
            label="Email"
            id="email"
            required
            component={FormikControl}
          />
        </>
      );
    }

    if (page === 1) {
      return (
        <>
          <Field
            type={renderVisibility('senha', 'text', 'password')}
            name="senha"
            label="Senha"
            id="senha"
            required
            component={FormikControl}
            append={
              <IconButton
                type="button"
                aria-label={renderVisibility(
                  'rsenha',
                  'Ocultar campo "senha"',
                  'Mostrar campo "senha"'
                )}
                onClick={toggleVisibility('senha')}
              >
                {renderVisibility('senha')}
              </IconButton>
            }
          />
          <Field
            type={renderVisibility('rsenha', 'text', 'password')}
            name="rsenha"
            label="Repetir senha"
            id="rsenha"
            required
            component={FormikControl}
            append={
              <IconButton
                type="button"
                aria-label={renderVisibility(
                  'rsenha',
                  'Ocultar campo "repetir senha"',
                  'Mostrar campo "repetir senha"'
                )}
                onClick={toggleVisibility('rsenha')}
              >
                {renderVisibility('rsenha')}
              </IconButton>
            }
          />
        </>
      );
    }

    return <>empresa</>;
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
            rsenha: '',
          }}
          onSubmit={values => {
            // eslint-disable-next-line no-console
            console.log(values);
          }}
        >
          {({ validateForm, submitForm, setFieldTouched }) => (
            <Form>
              <>
                {renderForm(currentPage)}
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
      </Container>
    </>
  );
}
