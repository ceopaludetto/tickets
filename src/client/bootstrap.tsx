import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import { generate } from 'shortid';

import favicon from '@/client/assets/favicon.png';
import { Progress, ProgressContext } from '@/client/components/layout';
import { ThemeChanger } from '@/client/components/logic';
import { MainRoutes } from '@/client/routes/main';
import { IS_PRODUCTION, PUBLIC_URL } from '@/client/utils/constants';
import '@/client/scss/normalize.scss';

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
            {IS_PRODUCTION && <link rel="manifest" href={`${PUBLIC_URL}/public/manifest.json`} />}
            <link rel="icon" href={favicon} />
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
