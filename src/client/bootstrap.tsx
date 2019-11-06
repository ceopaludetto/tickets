import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import { useApolloClient } from '@apollo/react-hooks';
import { useToggle } from 'react-use';
import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';

import { routes } from '@/client/providers/route';
import { ProgressContext } from '@/client/providers/progress';
import { Progress, ThemeChanger } from '@/client/components/composed';

import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils';

export default function App() {
  const [isAnimating, toggleIsAnimating] = useToggle(false);
  const [currentKey, setNewKey] = useState<string | undefined>(undefined);
  const client = useApolloClient();

  function handleIsAnimating(next?: boolean) {
    if (next) {
      // start
      setNewKey(
        typeof window === 'undefined'
          ? Buffer.from(String(Math.random())).toString('base64')
          : btoa(String(Math.random()))
      );
    }

    toggleIsAnimating(next);
  }

  return (
    <ThemeChanger>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <ProgressContext.Provider
          value={{
            isAnimating,
            toggleIsAnimating: handleIsAnimating,
          }}
        >
          <>
            <CssBaseline />
            <Progress isAnimating={isAnimating} key={currentKey} />
            <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
              {IS_PRODUCTION && (
                <link
                  rel="manifest"
                  href={`${PUBLIC_PATH}public/manifest.json`}
                />
              )}
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
              />
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              />
              <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
              {/* <meta
          name="theme-color"
          content={
            theme.mode === Mode.Light
              ? theme.colors.background
              : theme.colors.backgroundDark
          }
        /> */}
            </Helmet>
            {routes && renderRoutes(routes, { client })}
          </>
        </ProgressContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeChanger>
  );
}
