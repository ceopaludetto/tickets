import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/react-common';
import { HttpLink } from 'apollo-link-http';
import { StylesProvider } from '@material-ui/styles';

import App from '@/client/bootstrap';
import { createClient } from '@/client/providers/apollo';
import { createClassGenerator } from '@/client/providers/theme';

const client = createClient(
  false,
  new HttpLink({
    credentials: 'include',
    uri: '/graphql',
  })
);

const generateClassName = createClassGenerator();

loadableReady(() => {
  hydrate(
    <StylesProvider generateClassName={generateClassName}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </StylesProvider>,
    document.querySelector('#app')
  );
});

if (module.hot) {
  module.hot.accept();
}
