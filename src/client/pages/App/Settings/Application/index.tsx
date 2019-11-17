import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ApplicationSettings() {
  return (
    <>
      <Helmet title="Aplicação" />
      {/* <Switch
        id="darkTheme"
        label="Tema escuro"
        checked={checked}
        onChange={changeTheme}
        content="Ao ativar a aplicação utiliza tons de cores escuros"
      /> */}
    </>
  );
}
