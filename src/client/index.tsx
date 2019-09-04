import React, { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/react-common';
import { HttpLink } from 'apollo-link-http';

import Bootstrap from '@/client/bootstrap';
import { createClient } from '@/client/providers/apollo';

const client = createClient(
  false,
  new HttpLink({
    credentials: 'include',
    uri: '/graphql',
  })
);

function render(App: () => JSX.Element) {
  loadableReady(() => {
    hydrate(
      <StrictMode>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </StrictMode>,
      document.querySelector('#app')
    );
  });
}

render(Bootstrap);

if (module.hot) {
  module.hot.accept('./bootstrap.tsx', () => {
    // eslint-disable-next-line global-require
    const newApp = require('./bootstrap').default;
    render(newApp);
  });
}
