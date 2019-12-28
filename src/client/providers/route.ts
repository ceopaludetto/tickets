import loadable, { LoadableComponent } from '@loadable/component';

import { Thunk } from '@/client/utils/common.dto';

export interface Route {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  render?: () => React.Component;
  component: LoadableComponent<unknown>;
  children?: Route[];
  thunks?: Thunk[];
}

export const routes: Route[] = [
  {
    path: ['/'],
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "root" */ '@/client/pages/root/main')),
  },
  {
    path: ['/auth/login', '/auth/register', '/auth/forgot'],
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "auth" */ '@/client/pages/auth/main')),
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
];
