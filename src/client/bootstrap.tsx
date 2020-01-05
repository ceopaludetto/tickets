import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useToggle } from 'react-use';

import favicon from '@/client/assets/favicon.png';
import { Progress, ProgressContext } from '@/client/components/layout';
import { MainRoutes } from '@/client/routes/main';
import { PUBLIC_URL } from '@/client/utils/constants';
import '@/client/scss/normalize.scss';

export default function App() {
  const [isAnimating, toggleAnimation] = useToggle(false);

  return (
    <ProgressContext.Provider value={{ isAnimating, toggleAnimation }}>
      <>
        <Progress />
        <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
          {process.env.NODE_ENV === 'production' && <link rel="manifest" href={`${PUBLIC_URL}/public/manifest.json`} />}
          <link rel="icon" href={favicon} />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </Helmet>
        <MainRoutes />
      </>
    </ProgressContext.Provider>
  );
}
