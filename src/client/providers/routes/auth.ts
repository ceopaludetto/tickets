import loadable from '@loadable/component';

import { Route } from './route.dto';

export const authRoutes: Route[] = [
  {
    path: '/auth/login',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "auth.login" */ '@/client/pages/Auth/Login')),
  },
  {
    path: '/auth/register',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "auth.register" */ '@/client/pages/Auth/Register')),
  },
  {
    path: '/auth/forgot',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "auth.forgot" */ '@/client/pages/Auth/Forgot')),
  },
];
