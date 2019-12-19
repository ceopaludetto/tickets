import React from 'react';
import { Helmet } from 'react-helmet-async';

import { MainRoutes } from '@/client/routes/main';
import { IS_PRODUCTION, PUBLIC_PATH } from '@/client/utils/constants';
import { ThemeChanger } from '@/client/components/logic';
import { Normalize } from '@/client/components/primitives';

export default function App() {
  return (
    <ThemeChanger>
      <>
        <Normalize />
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
