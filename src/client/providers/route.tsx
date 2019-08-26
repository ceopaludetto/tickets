import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import { stringify } from 'query-string';
import loadable from '@loadable/component';

import { LoggedQuery } from '@/client/typescript/graphql';
import { ReactContextType } from '@/server/utils/common.dto';

import Main from '@/client/pages/Main';
import Auth from '@/client/pages/Auth';
import App from '@/client/pages/App';

export type Route = Omit<RouteConfig, 'path'> & { path: string | string[] };

type RenderProps = { data?: LoggedQuery } & RouteConfigComponentProps;

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
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: loadable(() => import('@/client/pages/Auth/Login')),
      },
      {
        path: '/auth/register',
        exact: true,
        component: loadable(() => import('@/client/pages/Auth/Register')),
      },
    ],
  },
  {
    path: ['/app'],
    exact: true,
    render: ({ data, staticContext, location, ...rest }: RenderProps) => {
      if (!data || !data.logged) {
        if (staticContext) {
          (staticContext as ReactContextType).url = `/auth/login?${stringify({
            from: location.pathname,
          })}`;
        } else {
          return (
            <Redirect
              from={location.pathname}
              to={{
                pathname: '/auth/login',
                search: stringify({
                  from: location.pathname,
                }),
              }}
            />
          );
        }
      }

      return (
        <App staticContext={staticContext} location={location} {...rest} />
      );
    },
  },
];
