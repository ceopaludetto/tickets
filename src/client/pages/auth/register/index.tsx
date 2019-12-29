import React from 'react';
import useForm, { FormContext } from 'react-hook-form';
import { FiUser, FiLock, FiAirplay } from 'react-icons/fi';

import u from '@/client/scss/utils.scss';
import { FormControl, Overline, Title, Grid, Button, Stepper } from '@/client/components';
import { telMask } from '@/client/services/validations/masks';
import { RegisterValidationSchema } from '@/client/services/validations/auth/register';
import { useStepper } from '@/client/utils';

export default function AuthRegister() {
  const methods = useForm({ validationSchema: RegisterValidationSchema });
  const [render, { currentPage, togglePage, totalPages, nextPage, prevPage, isFirst, isLast }] = useStepper([
    <Grid>
      <Grid.Item column={6}>
        <FormControl name="nome" label="Nome" id="nome" />
      </Grid.Item>
      <Grid.Item column={6}>
        <FormControl name="sobrenome" label="Sobrenome" id="sobrenome" />
      </Grid.Item>
      <Grid.Item column={12}>
        <FormControl name="email" label="Email" id="email" />
      </Grid.Item>
      <Grid.Item column={6}>
        <FormControl name="telefone" label="Telefone" mask={telMask} />
      </Grid.Item>
      <Grid.Item column={6}>
        <FormControl name="dataNascimento" label="Data de Nascimento" />
      </Grid.Item>
    </Grid>,
    <Grid>
      <Grid.Item column={6}>
        <FormControl name="senha" label="Senha" id="senha" />
        <FormControl name="rsenha" label="Repetir Senha" id="rsenha" />
      </Grid.Item>
      <Grid.Item column={6}>senha</Grid.Item>
    </Grid>,
    <Grid>
      <Grid.Item column={6}>
        <FormControl name="senha" label="Senha" id="senha" />
        <FormControl name="rsenha" label="Repetir Senha" id="rsenha" />
      </Grid.Item>
      <Grid.Item column={6}>senha</Grid.Item>
    </Grid>,
  ]);

  const onSubmit = methods.handleSubmit(v => console.log(v));

  return (
    <FormContext {...methods}>
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
        <form onSubmit={onSubmit}>
          {render()}
          <div className={u['xs:ta-right']}>
            <>
              {!isFirst && (
                <>
                  <Button onClick={prevPage} variant="flat" color="secondary" type="button">
                    Anterior
                  </Button>{' '}
                </>
              )}
              {isLast ? (
                <Button variant="contained" type="submit">
                  Cadastrar
                </Button>
              ) : (
                <Button onClick={nextPage} variant="contained" type="button">
                  Próximo
                </Button>
              )}
            </>
          </div>
        </form>
      </>
    </FormContext>
  );
}
