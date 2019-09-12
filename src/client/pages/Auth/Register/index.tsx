import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'styled-bootstrap-grid';
import { FiUser, FiLock, FiGlobe } from 'react-icons/fi';
import { Formik, Form, FormikErrors } from 'formik';
import UseKey from 'react-use/lib/comps/UseKey';

import { Button } from '@/client/components/form';
import { Title, SubTitle } from '@/client/components/typo';
import { TextAlign } from '@/client/components/layout';
import { Stepper } from '@/client/components/composed';
import { RegisterValidation } from '@/client/providers/validations';
import { useMultipleVisibility } from '@/client/utils';
import { renderForm } from './render';

interface Fields {
  nome?: string;
  email?: string;
  sobrenome?: string;
  telefone?: string;
  nascimento?: string;
  senha?: string;
  rsenha?: string;
  hasEmpresa?: boolean;
  cnpj?: string;
  nomeFantasia?: string;
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
            nascimento: '',
            rsenha: '',
            hasEmpresa: false,
            cnpj: '',
            nomeFantasia: '',
          }}
          onSubmit={values => {
            // eslint-disable-next-line no-console
            console.log(values);
          }}
        >
          {({ validateForm, submitForm, setFieldTouched, values }) => (
            <Form>
              <>
                {renderForm(currentPage, values.hasEmpresa, {
                  renderVisibility,
                  toggleVisibility,
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
      </Container>
    </>
  );
}
