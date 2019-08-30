import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { useQuery } from '@apollo/react-hooks';

import { Content, GlobalBackground } from './styles';
import { Sidebar } from '@/client/components/composed';
import { Theme } from '@/client/graphql/local.gql';
import { Mode } from '@/client/providers/theme';

export default function App({ route }: RouteConfigComponentProps) {
  const { data } = useQuery(Theme);
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider
      theme={{ ...theme, mode: data.isDark ? Mode.Dark : Mode.Light }}
    >
      <>
        <GlobalBackground />
        <Sidebar />
        <Content>{route && renderRoutes(route.routes)}</Content>
      </>
    </ThemeProvider>
  );
}
