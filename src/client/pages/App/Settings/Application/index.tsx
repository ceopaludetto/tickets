import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';

import { Switch } from '@/client/components/form';
import { Theme } from '@/client/graphql/local.gql';

export default function ApplicationSettings() {
  const { data, client } = useQuery(Theme);

  function changeTheme() {
    client.writeQuery({
      query: Theme,
      data: {
        isDark: !data.isDark,
      },
    });
  }

  return (
    <>
      <Helmet title="Aplicação" />
      <Switch
        id="darkTheme"
        label="Tema escuro"
        defaultChecked={data.isDark}
        onChange={changeTheme}
        content="Ao ativar a aplicação utiliza tons de cores escuros"
      />
    </>
  );
}
