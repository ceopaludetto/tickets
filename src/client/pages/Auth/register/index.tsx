import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

import { FormControl, Overline, Title } from '@/client/components';

export default function AuthRegister() {
  const methods = useForm();

  return (
    <FormContext {...methods}>
      <>
        <Overline>Cadastro</Overline>
        <Title gutterBottom>Vamos começar!</Title>
        <form>
          <FormControl name="nome" label="Nome" />
          <FormControl name="sobrenome" label="Sobrenome" />
        </form>
      </>
    </FormContext>
  );
}
