import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@/client/bootstrap';
import { ApiContext } from '@/client/providers/api';
import { createReduxStore } from '@/client/providers/store';
import { IS_PRODUCTION } from '@/client/utils/constants';

import * as serviceWorker from './registerServiceWorker';

const { store, api } = createReduxStore(((window as unknown) as any).__PRELOADED_STATE__);

if (IS_PRODUCTION) {
  delete ((window as unknown) as any).__PRELOADED_STATE__;
}

loadableReady(() => {
  hydrate(
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ApiContext.Provider value={{ api }}>
            <App />
          </ApiContext.Provider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>,
    document.querySelector('#app')
  );
});

if (module.hot) {
  module.hot.accept();
}
if (IS_PRODUCTION) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
