import React from 'react';
import axe from 'react-axe';
import ReactDom from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { loadableReady } from '@loadable/component';

import App from '@/client/bootstrap';
import { ApiContext } from '@/client/providers/api';
import * as serviceWorker from '@/client/providers/register.service.worker';
import { createReduxStore } from '@/client/providers/store';
import { IS_PRODUCTION } from '@/client/utils/constants';

const { store, api } = createReduxStore(((window as unknown) as any).__PRELOADED_STATE__);

if (IS_PRODUCTION) {
  delete ((window as unknown) as any).__PRELOADED_STATE__;
}

loadableReady(() => {
  const root = document.querySelector('#app');

  const method = root?.hasChildNodes() ? 'hydrate' : 'render';

  ReactDom[method](
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ApiContext.Provider value={{ api }}>
            <App />
          </ApiContext.Provider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>,
    root
  );
});

if (!IS_PRODUCTION) {
  axe(React, ReactDom, 1000);
}

if (module.hot) {
  module.hot.accept();
}
if (IS_PRODUCTION) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
