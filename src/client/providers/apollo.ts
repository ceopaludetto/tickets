import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createClient(isSsr = false, link: any) {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === 'development',
  });

  if (!isSsr) {
    cache.restore(window.__APOLLO_STATE__);
    delete window.__APOLLO_STATE__;
  }

  return client;
}
