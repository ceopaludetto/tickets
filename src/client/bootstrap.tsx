import React from 'react';
import { Helmet } from 'react-helmet-async';
import '@/client/scss/normalize.scss';

import { MainRoutes } from '@/client/routes/main';
import { ThemeChanger } from '@/client/components/logic';
import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils/constants';

export default function App() {
  return (
    <ThemeChanger>
      <>
        <Helmet defaultTitle="F3Desk" titleTemplate="%s | F3Desk">
          {IS_PRODUCTION && <link rel="manifest" href={`${PUBLIC_PATH}public/manifest.json`} />}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </Helmet>
        <MainRoutes />
      </>
    </ThemeChanger>
  );
}
