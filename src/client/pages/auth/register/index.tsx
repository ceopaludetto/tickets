import React, { cloneElement, useCallback, useMemo } from 'react';
import { useFormik, FormikContext } from 'formik';
import { FiUser, FiLock, FiBriefcase } from 'react-icons/fi';
import { useMeasure, useIsomorphicLayoutEffect } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import u from '@/client/scss/utils.scss';
import {
  FormControl,
  Form,
  Overline,
  Title,
  Grid,
  Button,
  Stepper,
  Paper,
  FormCheckbox,
  List,
} from '@/client/components';
import { RegisterValidationSchema, telMask, dateMask, cnpjMask, cepMask } from '@/client/services/validations';
import { useStepper, useMultipleVisibility } from '@/client/utils';

const animationVariants = {
  initial: {
    x: '5%',
    opacity: 0,
    transition: { duration: 0.25 },
  },
  enter: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    x: '-5%',
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

export default function AuthRegister() {
  const { mapVisibilityProps } = useMultipleVisibility<('senha' | 'rsenha')[]>(['senha', 'rsenha']);
  const [ref, { height }] = useMeasure();
  const { currentPage, togglePage, totalPages, nextPage, prevPage, isFirst, isLast } = useStepper(3);
  const formik = useFormik({
    validationSchema: RegisterValidationSchema,
    initialValues: {
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      senha: '',
      rsenha: '',
      hasEmpresa: false,
      razaoSocial: '',
      nomeFantasia: '',
      nomeCompleto: '',
      cnpj: '',
      empresaEmail: '',
      empresaTelefone: '',
      site: '',
      cep: '',
      endereco: '',
      numero: '',
    },
    onSubmit: v => console.log(v), // eslint-disable-line no-console
  });
  const {
    errors,
    submitForm,
    isValidating,
    values: { senha, hasEmpresa },
  } = formik;

  const { lower, upper, number } = useMemo(
    () => ({
      lower: /(?=.*[a-z])/.test(senha),
      upper: /(?=.*[A-Z])/.test(senha),
      number: /(?=.*\d)/.test(senha),
    }),
    [senha]
  );

  useIsomorphicLayoutEffect(() => {
    if (isValidating) {
      if (errors.nome || errors.sobrenome || errors.email || errors.telefone || errors.dataNascimento) {
        togglePage(0);
      } else if (errors.senha || errors.rsenha) {
        togglePage(1);
      } else {
        togglePage(2);
      }
    }
  }, [isValidating]);

  const handleValidate = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    await submitForm();
  };

  const renderPage = useCallback(
    (pages: React.ReactElement<any>[]) =>
      cloneElement(pages[currentPage], {
        key: currentPage,
      }),
    [currentPage]
  );

  return (
    <FormikContext.Provider value={formik}>
      <>
        <Overline>Cadastro</Overline>
        <Title gutterBottom>Vamos começar!</Title>
        <Stepper
          labels={[
            { text: 'Usuário', icon: FiUser },
            { text: 'Senha', icon: FiLock },
            { text: 'Empresa', icon: FiBriefcase },
          ]}
          currentPage={currentPage}
          togglePage={togglePage}
          totalPages={totalPages}
          nextPage={nextPage}
        />
        <Form onSubmit={handleValidate}>
          <motion.div animate={{ height, transition: { ease: 'easeInOut', duration: 0.2 } }}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {renderPage([
                <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
                  <Grid ref={ref}>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required name="nome" label="Nome" id="nome" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required name="sobrenome" label="Sobrenome" id="sobrenome" />
                    </div>
                    <div className={u['xs:grid-column-12']}>
                      <FormControl required name="email" label="Email" id="email" type="email" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl name="telefone" label="Telefone" mask={telMask} id="telefone" type="tel" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl
                        required
                        name="dataNascimento"
                        label="Data de Nascimento"
                        mask={dateMask}
                        id="dataNascimento"
                      />
                    </div>
                  </Grid>
                </motion.div>,
                <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
                  <Grid ref={ref}>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <>
                        <FormControl required name="senha" label="Senha" id="senha" {...mapVisibilityProps('senha')} />
                        <FormControl
                          required
                          name="rsenha"
                          label="Repetir Senha"
                          id="rsenha"
                          {...mapVisibilityProps('rsenha')}
                        />
                      </>
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <Paper small border>
                        <Overline gutterBottom>Dicas de senha</Overline>
                        <List>
                          <List.Item disabled={lower}>Pelo menos uma letra minúscula</List.Item>
                          <List.Item disabled={upper}>Pelo menos uma letra maiúscula</List.Item>
                          <List.Item disabled={number}>Pelo menos um número</List.Item>
                        </List>
                      </Paper>
                    </div>
                  </Grid>
                </motion.div>,
                <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
                  <Grid ref={ref}>
                    <div className={u['xs:grid-column-12']}>
                      <FormCheckbox labelPlacement="right" name="hasEmpresa" label="Criar empresa?" id="hasEmpresa" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required={hasEmpresa} name="cnpj" label="CNPJ" id="cnpj" mask={cnpjMask} />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required={hasEmpresa} name="razaoSocial" label="Razão Social" id="razaoSocial" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required={hasEmpresa} name="nomeFantasia" label="Nome Fantasia" id="nomeFantasia" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl
                        required={hasEmpresa}
                        name="empresaTelefone"
                        label="Telefone"
                        id="empresaTelefone"
                        type="tel"
                        mask={telMask}
                      />
                    </div>
                    <div className={u['xs:grid-column-12']}>
                      <FormControl name="nomeCompleto" label="Nome Completo" id="nomeCompleto" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl name="site" label="Site" id="site" type="url" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required={hasEmpresa} name="empresaEmail" label="Email" id="empresaEmail" />
                    </div>
                    <div className={clsx(u['xs:grid-column-12'], u['md:grid-column-6'])}>
                      <FormControl required={hasEmpresa} name="cep" label="CEP" id="cep" mask={cepMask} />
                    </div>
                    <div className={clsx(u['xs:grid-column-9'], u['md:grid-column-4'])}>
                      <FormControl required={hasEmpresa} name="endereco" label="Endereço" id="endereco" />
                    </div>
                    <div className={clsx(u['xs:grid-column-3'], u['md:grid-column-2'])}>
                      <FormControl required={hasEmpresa} name="numero" label="Nº" id="numero" />
                    </div>
                  </Grid>
                </motion.div>,
              ])}
            </AnimatePresence>
          </motion.div>
          <div className={u['xs:ta-right']}>
            <>
              {!isFirst && (
                <>
                  <Button onClick={prevPage} variant="flat" color="secondary" type="button">
                    Anterior
                  </Button>{' '}
                </>
              )}
              {isLast && (
                <Button variant="contained" type="submit">
                  Cadastrar
                </Button>
              )}
              {!isLast && (
                <Button onClick={nextPage} variant="contained" type="button">
                  Próximo
                </Button>
              )}
            </>
          </div>
        </Form>
      </>
    </FormikContext.Provider>
  );
}
