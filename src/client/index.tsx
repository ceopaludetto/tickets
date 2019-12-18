/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/core';

import App from '@/client/bootstrap';
import { createReduxStore } from '@/client/providers/store';
import { generateCache } from '@/client/providers/emotion.cache';
import { IS_PRODUCTION } from '@/client/utils/constants';

const store = createReduxStore(((window as unknown) as any).__PRELOADED_STATE__);
const emotionCache = generateCache();

if (IS_PRODUCTION) {
  delete ((window as unknown) as any).__PRELOADED_STATE__;
}

loadableReady(() => {
  hydrate(
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </CacheProvider>,
    document.querySelector('#app')
  );
});

if (module.hot) {
  module.hot.accept();
}
