import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

import u from '@/client/scss/utils.scss';
import { FormControl, Overline, Title, Grid, Button } from '@/client/components';
import { telMask } from '@/client/services/validations/masks';

export default function AuthRegister() {
  const methods = useForm();

  return (
    <FormContext {...methods}>
      <>
        <Overline>Cadastro</Overline>
        <Title gutterBottom>Vamos começar!</Title>
        <form>
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
          </Grid>
          <div className={u['xs:ta-right']}>
            <Button variant="flat" color="secondary" type="button">
              Anterior
            </Button>{' '}
            <Button variant="contained" type="button">
              Próximo
            </Button>
          </div>
        </form>
      </>
    </FormContext>
  );
}
