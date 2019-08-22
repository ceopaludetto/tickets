import React, { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/react-common';
import { HttpLink } from 'apollo-link-http';

import App from '@/client/bootstrap';
import { createClient } from '@/client/providers/apollo';

const client = createClient(
  false,
  new HttpLink({
    credentials: 'include',
    uri: '/graphql',
  })
);

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

if (module.hot) {
  module.hot.accept();
}
