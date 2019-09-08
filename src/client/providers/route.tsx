import React from 'react';
import { Redirect } from 'react-router-dom';
import { stringify } from 'query-string';

import { ReactContextType } from '@/server/utils/common.dto';
import { Route, RenderProps, appRoutes, authRoutes } from './routes';
import Main from '@/client/pages/Main/MainPage';
import Auth from '@/client/pages/Auth/MainPage';
import App from '@/client/pages/App/MainPage';

export const routes: Route[] = [
  {
    path: ['/'],
    exact: true,
    component: Main,
  },
  {
    path: ['/auth/login', '/auth/register', '/auth/forgot'],
    exact: true,
    render: ({ data, staticContext, location, ...rest }: RenderProps) => {
      if (data && data.logged) {
        if (staticContext) {
          (staticContext as ReactContextType).url = '/app';
        } else {
          return <Redirect from={location.pathname} to="/app" />;
        }
      }

      return (
        <Auth staticContext={staticContext} location={location} {...rest} />
      );
    },
    routes: authRoutes,
  },
  {
    path: '/app',
    exact: false,
    render: ({ data, staticContext, location, ...rest }: RenderProps) => {
      if (!data || !data.logged) {
        const metadata = stringify({
          from: location.pathname,
        });
        if (staticContext) {
          (staticContext as ReactContextType).url = `/auth/login?${metadata}`;
        } else {
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
      }

      return (
        <App staticContext={staticContext} location={location} {...rest} />
      );
    },
    routes: appRoutes,
  },
];

export { Route };
