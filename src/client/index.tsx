import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from '@/client/bootstrap';
import { createReduxStore } from '@/client/providers/store';
import { ApiContext } from '@/client/providers/api';
import { IS_PRODUCTION } from '@/client/utils/constants';

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
