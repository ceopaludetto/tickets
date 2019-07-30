import React, { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from '@/client/bootstrap';

loadableReady(() => {
  hydrate(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
    document.querySelector('#app')
  );
});

if (module.hot) {
  module.hot.accept();
}
