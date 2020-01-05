import React from 'react';
import ReactDom from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { loadableReady } from '@loadable/component';

import App from '@/client/bootstrap';
import { ApiContext } from '@/client/providers/api';
import * as serviceWorker from '@/client/providers/register.service.worker';
import { createReduxStore } from '@/client/providers/store';

const { store, api } = createReduxStore(((window as unknown) as any).__PRELOADED_STATE__);

function render() {
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
}

if (process.env.NODE_ENV === 'production') {
  delete ((window as unknown) as any).__PRELOADED_STATE__;
}

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    axe.default(React, ReactDom, 1000);
    render();
  });
} else {
  render();
}

if (module.hot) {
  module.hot.accept();
}
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
