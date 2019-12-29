import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { FiUser, FiLock, FiAirplay } from 'react-icons/fi';
import { useMeasure } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

import u from '@/client/scss/utils.scss';
import {
  FormControl,
  Form,
  Overline,
  Title,
  Grid,
  GridItem,
  Button,
  Stepper,
  Paper,
  FormCheckbox,
} from '@/client/components';
import { RegisterValidationSchema, telMask, dateMask } from '@/client/services/validations';
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

interface RegisterData {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
  rsenha: string;
}

export default function AuthRegister() {
  const { mapVisibilityProps } = useMultipleVisibility<('senha' | 'rsenha')[]>(['senha', 'rsenha']);
  const [ref, { height }] = useMeasure();
  const [render, { currentPage, togglePage, totalPages, nextPage, prevPage, isFirst, isLast }] = useStepper([
    <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
      <Grid ref={ref}>
        <GridItem column={6}>
          <FormControl required name="nome" label="Nome" id="nome" />
        </GridItem>
        <GridItem column={6}>
          <FormControl required name="sobrenome" label="Sobrenome" id="sobrenome" />
        </GridItem>
        <GridItem column={12}>
          <FormControl required name="email" label="Email" id="email" />
        </GridItem>
        <GridItem column={6}>
          <FormControl name="telefone" label="Telefone" mask={telMask} />
        </GridItem>
        <GridItem column={6}>
          <FormControl required name="dataNascimento" label="Data de Nascimento" mask={dateMask} />
        </GridItem>
      </Grid>
    </motion.div>,
    <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
      <Grid>
        <GridItem column={6}>
          <>
            <FormControl required name="senha" label="Senha" id="senha" {...mapVisibilityProps('senha')} />
            <FormControl required name="rsenha" label="Repetir Senha" id="rsenha" {...mapVisibilityProps('rsenha')} />
          </>
        </GridItem>
        <GridItem column={6}>
          <Paper small border>
            <ul>
              <li>Pelo menos uma letra maiúscula</li>
              <li>Pelo menos uma letra minúscula</li>
              <li>Pelo menos um número</li>
            </ul>
          </Paper>
        </GridItem>
      </Grid>
    </motion.div>,
    <motion.div variants={animationVariants} initial="initial" animate="enter" exit="exit">
      <Grid>
        <GridItem column={12}>
          <FormCheckbox labelPlacement="right" name="hasEmpresa" label="Criar empresa?" id="hasEmpresa" />
        </GridItem>
        <GridItem column={6}>
          <FormControl name="razaoSocial" label="Razão Social" id="razaoSocial" />
        </GridItem>
      </Grid>
    </motion.div>,
  ]);

  const handleValidate = ({
    errors,
    submitForm,
  }: {
    errors: FormikErrors<RegisterData>;
    submitForm: () => Promise<any>;
  }) => (e: React.MouseEvent<any>) => {
    e.preventDefault();
    submitForm().then(() => {
      if (errors.nome || errors.sobrenome || errors.email || errors.telefone || errors.dataNascimento) {
        return togglePage(0)(e);
      }

      if (errors.senha || errors.rsenha) {
        return togglePage(1)(e);
      }

      return togglePage(2)(e);
    });
  };

  return (
    <Formik
      onSubmit={values => console.log(values)}
      initialValues={{ nome: '', sobrenome: '', email: '', telefone: '', dataNascimento: '', senha: '', rsenha: '' }}
      validationSchema={RegisterValidationSchema}
    >
      {({ errors, submitForm }) => (
        <>
          <Overline>Cadastro</Overline>
          <Title gutterBottom>Vamos começar!</Title>
          <Stepper
            labels={[
              { text: 'Usuário', icon: FiUser },
              { text: 'Senha', icon: FiLock },
              { text: 'Empresa', icon: FiAirplay },
            ]}
            currentPage={currentPage}
            togglePage={togglePage}
            totalPages={totalPages}
          />
          <Form onSubmit={handleValidate({ errors, submitForm })}>
            <motion.div animate={{ height, transition: { ease: 'easeInOut', duration: 0.2 } }}>
              <AnimatePresence exitBeforeEnter initial={false}>
                {render()}
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
      )}
    </Formik>
  );
}
