import loadable, { LoadableComponent } from '@loadable/component';

export interface Route {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  render?: () => React.Component;
  component: LoadableComponent<unknown>;
  children?: Route[];
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
    ],
  },
];
