import React from 'react';
import { Redirect } from 'react-router-dom';
import { stringify, parse } from 'query-string';
import { ApolloClient } from 'apollo-client';

import { ReactContextType } from '@/server/utils/common.dto';
import { Route, RenderProps, authRoutes, appRoutes } from './routes';
import { Logged } from '@/client/graphql/local.gql';
import Main from '@/client/pages/Main/MainPage';
import Auth from '@/client/pages/Auth/MainPage';
import App from '@/client/pages/App/MainPage';

function isLogged(client: ApolloClient<object>) {
  const res = client.readQuery<LoggedQuery>({
    query: Logged,
  });

  if (res && res.logged) {
    return res.logged;
  }

  return false;
}

export const routes: Route[] = [
  {
    path: ['/'],
    exact: true,
    component: Main,
  },
  {
    path: ['/auth/login', '/auth/register', '/auth/forgot'],
    exact: true,
    render: ({ client, staticContext, location, ...rest }: RenderProps) => {
      const isLoggedRes = isLogged(client);

      if (isLoggedRes) {
        const route: string = (parse(location.search).from as string) || '/app';

        if (staticContext) {
          (staticContext as ReactContextType).url = route;
        }

        return <Redirect from={location.pathname} to={route} />;
      }

      return <Auth staticContext={staticContext} location={location} {...rest} />;
    },
    routes: authRoutes,
  },
  {
    path: '/app',
    exact: false,
    render: ({ client, staticContext, location, ...rest }: RenderProps) => {
      const isLoggedRes = isLogged(client);

      if (!isLoggedRes) {
        const metadata = stringify({
          from: location.pathname,
        });

        if (staticContext) {
          (staticContext as ReactContextType).url = `/auth/login?${metadata}`;
        }

        return (
          <Redirect
            from={location.pathname}
            to={{
              pathname: '/auth/login',
              search: metadata,
            }}
          />
        );
      }

      return <App staticContext={staticContext} location={location} {...rest} />;
    },
    routes: appRoutes,
  },
];

export { Route, appRoutes as AppRoutes };
