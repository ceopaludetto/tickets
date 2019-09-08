import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { renderRoutes } from 'react-router-config';
import { useQuery } from '@apollo/react-hooks';

import { LoggedQuery } from '@/client/typescript/graphql';
import { Logged } from '@/client/graphql/local.gql';
import { theme, gridTheme } from '@/client/providers/theme';
import { routes } from '@/client/providers/route';
import { GlobalStyle } from '@/client/styles/global';
import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils';

export default function App() {
  const { data } = useQuery<LoggedQuery>(Logged);

  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={gridTheme}>
        <>
          <GlobalStyle />
          <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
            {IS_PRODUCTION && (
              <link
                rel="manifest"
                href={`${PUBLIC_PATH}public/manifest.json`}
              />
            )}
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="theme-color" content={theme.colors.background.main} />
          </Helmet>
          {renderRoutes(routes, { data })}
        </>
      </GridThemeProvider>
    </ThemeProvider>
  );
}
