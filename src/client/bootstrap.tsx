import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToggle } from 'react-use';
import { useLocation } from 'react-router-dom';
import { generate } from 'shortid';

import '@/client/scss/normalize.scss';
import { Progress, ProgressContext } from '@/client/components/layout';
import { MainRoutes } from '@/client/routes/main';
import { ThemeChanger } from '@/client/components/logic';
import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils/constants';

export default function App() {
  const location = useLocation();
  const [isAnimating, toggleAnimation] = useToggle(false);
  const key = useMemo(() => generate(), [location]);

  return (
    <ThemeChanger>
      <ProgressContext.Provider value={{ isAnimating, toggleAnimation }}>
        <>
          <Progress key={key} />
          <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
            {IS_PRODUCTION && <link rel="manifest" href={`${PUBLIC_PATH}public/manifest.json`} />}
            {/* <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet" /> */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          </Helmet>
          <MainRoutes />
        </>
      </ProgressContext.Provider>
    </ThemeChanger>
  );
}
