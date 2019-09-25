import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { useIsomorphicLayoutEffect, useToggle } from 'react-use';

import { Switch } from '@/client/components/form';
import { Theme } from '@/client/graphql/local.gql';

export default function ApplicationSettings() {
  const { data, client } = useQuery<ThemeQuery>(Theme);
  const [checked, toggleChecked] = useToggle(false);

  useIsomorphicLayoutEffect(() => {
    toggleChecked((data && data.isDark) || false);
  }, [data]);

  function changeTheme() {
    if (data) {
      client.writeQuery({
        query: Theme,
        data: {
          isDark: !data.isDark,
        },
      });
    }
  }

  return (
    <>
      <Helmet title="Aplicação" />
      <Switch
        id="darkTheme"
        label="Tema escuro"
        checked={checked}
        onChange={changeTheme}
        content="Ao ativar a aplicação utiliza tons de cores escuros"
      />
    </>
  );
}
