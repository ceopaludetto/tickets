import { RouteConfig } from 'react-router-config';
import loadable from '@loadable/component';

export type Route = Pick<
  RouteConfig,
  'routes' | 'component' | 'strict' | 'exact'
> & {
  path: string[] | string;
};

export const routes: Route[] = [
  {
    path: ['/'],
    exact: true,
    component: loadable(() => import('@/client/pages/main')),
  },
  {
    path: ['/auth/login', '/auth/register', '/auth/forgot'],
    exact: true,
    component: loadable(() => import('@/client/pages/auth')),
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: loadable(() => import('@/client/pages/auth/login')),
      },
    ],
  },
];
