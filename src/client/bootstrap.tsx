import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import { renderRoutes } from 'react-router-config';
import { useApolloClient } from '@apollo/react-hooks';
import { useToggle } from 'react-use';

import { theme, gridTheme, Mode } from '@/client/providers/theme';
import { routes } from '@/client/providers/route';
import { GlobalStyle } from '@/client/styles/global';
import { ProgressContext } from '@/client/providers/progress';
import { Progress } from '@/client/components/composed';
import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils';

export default function App() {
  const [isAnimating, toggleIsAnimating] = useToggle(false);
  const [currentKey, setNewKey] = useState<string | undefined>(undefined);
  const client = useApolloClient();

  return (
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={gridTheme}>
        <ProgressContext.Provider
          value={{
            isAnimating,
            toggleIsAnimating: next => {
              if (next) {
                // start
                setNewKey(btoa(String(Math.random())));
              }

              toggleIsAnimating(next);
            },
          }}
        >
          <>
            <GlobalStyle />
            <Progress isAnimating={isAnimating} key={currentKey} />
            <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
              {IS_PRODUCTION && (
                <link
                  rel="manifest"
                  href={`${PUBLIC_PATH}public/manifest.json`}
                />
              )}
              <link
                href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
                rel="stylesheet"
              />
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
              <meta
                name="theme-color"
                content={
                  theme.mode === Mode.Light
                    ? theme.colors.background
                    : theme.colors.backgroundDark
                }
              />
            </Helmet>
            {renderRoutes(routes, { client })}
          </>
        </ProgressContext.Provider>
      </GridThemeProvider>
    </ThemeProvider>
  );
}
