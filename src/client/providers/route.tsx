import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router-dom';
// import { stringify } from 'query-string';
import loadable from '@loadable/component';
import { FiHome, FiServer } from 'react-icons/fi';

import { LoggedQuery } from '@/client/typescript/graphql';
import { ReactContextType } from '@/server/utils/common.dto';

import Main from '@/client/pages/Main/MainPage';
import Auth from '@/client/pages/Auth/MainPage';
import App from '@/client/pages/App/MainPage';

export type Route = Omit<RouteConfig, 'path'> & {
  path: string | string[];
  name?: string;
  icon?: React.ReactNode;
  routes?: Route[];
};

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
        component: loadable(() =>
          import(
            /* webpackChunkName: "auth.login" */ '@/client/pages/Auth/Login'
          )
        ),
      },
      {
        path: '/auth/register',
        exact: true,
        component: loadable(() =>
          import(
            /* webpackChunkName: "auth.register" */ '@/client/pages/Auth/Register'
          )
        ),
      },
    ],
  },
  {
    path: '/app',
    exact: false,
    render: ({ staticContext, location, ...rest }: RenderProps) => {
      // if (!data || !data.logged) {
      //   const metadata = stringify({
      //     from: location.pathname,
      //   });
      //   if (staticContext) {
      //     (staticContext as ReactContextType).url = `/auth/login?${metadata}`;
      //   } else {
      //     return (
      //       <Redirect
      //         from={location.pathname}
      //         to={{
      //           pathname: '/auth/login',
      //           search: metadata,
      //         }}
      //       />
      //     );
      //   }
      // }

      return (
        <App staticContext={staticContext} location={location} {...rest} />
      );
    },
    routes: [
      {
        name: 'Início',
        icon: FiHome,
        path: '/app',
        exact: true,
        component: loadable(() =>
          import(/* webpackChunkName: "app.home" */ '@/client/pages/App/Home')
        ),
      },
      {
        name: 'Mesa',
        icon: FiServer,
        path: '/app/mesa',
        exact: true,
        component: loadable(() =>
          import(/* webpackChunkName: "app.mesa" */ '@/client/pages/App/Mesa')
        ),
      },
      {
        path: ['/app/settings', '/app/settings/application'],
        exact: true,
        component: loadable(() =>
          import(
            /* webpackChunkName: "app.settings" */ '@/client/pages/App/Settings'
          )
        ),
        routes: [
          {
            path: '/app/settings',
            exact: true,
            component: loadable(() =>
              import(
                /* webpackChunkName: "app.settings.userinfo" */ '@/client/pages/App/Settings/MainPage'
              )
            ),
          },
          {
            path: '/app/settings/application',
            exact: true,
            component: loadable(() =>
              import(
                /* webpackChunkName: "app.settings.application" */ '@/client/pages/App/Settings/Application'
              )
            ),
          },
        ],
      },
    ],
  },
];
