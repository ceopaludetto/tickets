import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CssBaseline } from '@material-ui/core';
import { renderRoutes } from 'react-router-config';
import { useApolloClient } from '@apollo/react-hooks';

import { routes } from '@/client/providers/route';
import { ProgressContext } from '@/client/providers/progress';
import { Progress, Providers } from '@/client/components/composed';
import { IS_PRODUCTION, PUBLIC_PATH, useRandomString } from '@/client/utils';

export default function App() {
  const { isAnimating, toggleIsAnimating, currentKey } = useRandomString();
  const client = useApolloClient();

  return (
    <Providers>
      <ProgressContext.Provider
        value={{
          isAnimating,
          toggleIsAnimating,
        }}
      >
        <>
          <CssBaseline />
          <Progress isAnimating={isAnimating} key={currentKey} />
          <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
            {IS_PRODUCTION && <link rel="manifest" href={`${PUBLIC_PATH}public/manifest.json`} />}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            {/* <meta
                name="theme-color"
                content={theme.mode === Mode.Light ? theme.colors.background : theme.colors.backgroundDark}
              /> */}
          </Helmet>
          {routes && renderRoutes(routes, { client })}
        </>
      </ProgressContext.Provider>
    </Providers>
  );
}
