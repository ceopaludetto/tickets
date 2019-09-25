import loadable from '@loadable/component';
import { FiHome, FiClipboard } from 'react-icons/fi';

import { Route } from './route.dto';
import { Profile } from '@/client/graphql/usuario.gql';
import { FindAllTickets } from '@/client/graphql/tickets.gql';

export const appRoutes: Route[] = [
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
    name: 'Chamados',
    icon: FiClipboard,
    path: '/app/mesa',
    exact: true,
    query: FindAllTickets,
    component: loadable(() =>
      import(/* webpackChunkName: "app.mesa" */ '@/client/pages/App/Mesa')
    ),
  },
  {
    path: [
      '/app/settings',
      '/app/settings/application',
      '/app/settings/empresa',
    ],
    exact: true,
    component: loadable(() =>
      import(
        /* webpackChunkName: "app.settings" */ '@/client/pages/App/Settings'
      )
    ),
    routes: [
      {
        name: 'Informações pessoais',
        path: '/app/settings',
        exact: true,
        query: Profile,
        component: loadable(() =>
          import(
            /* webpackChunkName: "app.settings.userinfo" */ '@/client/pages/App/Settings/MainPage'
          )
        ),
      },
      {
        name: 'Empresa',
        path: '/app/settings/empresa',
        exact: true,
        component: loadable(() =>
          import(
            /* webpackChunkName: "app.settings.empresa" */ '@/client/pages/App/Settings/Empresa'
          )
        ),
      },
      {
        name: 'Aplicação',
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
];
