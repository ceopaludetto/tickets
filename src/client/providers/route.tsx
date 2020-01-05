import React from 'react';
import { RouteProps, RouteComponentProps, Redirect } from 'react-router-dom';

import loadable, { LoadableComponent } from '@loadable/component';
import qs from 'query-string';

import { ApplicationActions, TicketsActions } from '@/client/services/ducks';
import { AuthState } from '@/client/services/ducks/auth/types';

export interface Route extends Omit<RouteProps, 'component' | 'render'> {
  render?: (props: RouteComponentProps & { auth: AuthState; staticContext?: any }) => React.ReactNode;
  component?: LoadableComponent<unknown>;
  children?: Route[];
  dispatches?: {
    action: ApplicationActions[keyof ApplicationActions];
    data: any;
  }[];
}

export const routes: Route[] = [
  {
    path: ['/'],
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "root" */ '@/client/pages/root/main')),
  },
  {
    path: '/404',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "404" */ '@/client/pages/errors/page404')),
  },
  {
    path: ['/auth/login', '/auth/register', '/auth/forgot'],
    exact: true,
    render: ({ auth, location, staticContext }) => {
      const Component = loadable(() => import(/* webpackChunkName: "auth" */ '@/client/pages/auth/main'));

      if (auth.data) {
        if (staticContext) {
          staticContext.url = '/app';
        } else {
          return <Redirect from={location.pathname} to="/app" />;
        }
      }

      return <Component />;
    },
    children: [
      {
        path: '/auth/login',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "auth.login" */ '@/client/pages/auth/login')),
      },
      {
        path: '/auth/register',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "auth.register" */ '@/client/pages/auth/register')),
      },
      {
        path: '/auth/forgot',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "auth.forgot" */ '@/client/pages/auth/forgot')),
      },
    ],
  },
  {
    path: ['/app', '/app/tickets'],
    exact: true,
    render: ({ auth, location, staticContext }) => {
      const Component = loadable(() => import(/* webpackChunkName: "app" */ '@/client/pages/app/main'));

      if (!auth.data) {
        const redir = `/auth/login?${qs.stringify({ from: location.pathname })}`;
        if (staticContext) {
          staticContext.url = redir;
        } else {
          return <Redirect from={location.pathname} to={redir} />;
        }
      }

      return <Component />;
    },
    children: [
      {
        path: '/app',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "app.home" */ '@/client/pages/app/home')),
      },
      {
        path: '/app/tickets',
        exact: true,
        dispatches: [{ action: TicketsActions.loadRequest, data: {} }],
        component: loadable(() => import(/* webpackChunkName: "app.tickets" */ '@/client/pages/app/tickets')),
      },
    ],
  },
];
