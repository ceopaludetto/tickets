import loadable from '@loadable/component';
import { AssignmentOutlined, DashboardOutlined } from '@material-ui/icons';

import { Route } from './route.dto';
import { Profile } from '@/client/graphql/usuario.gql';
import { FindAllTickets } from '@/client/graphql/tickets.gql';

export const appRoutes: Route[] = [
  {
    name: 'Início',
    icon: DashboardOutlined,
    path: '/app',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "app.home" */ '@/client/pages/App/Home')),
  },
  {
    name: 'Chamados',
    icon: AssignmentOutlined,
    path: '/app/mesa',
    exact: true,
    query: FindAllTickets,
    component: loadable(() => import(/* webpackChunkName: "app.mesa" */ '@/client/pages/App/Mesa')),
  },
  {
    name: 'Configurações',
    pathName: '/app/settings',
    path: ['/app/settings', '/app/settings/application', '/app/settings/empresa'],
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "app.settings" */ '@/client/pages/App/Settings/MainPage')),
    routes: [
      {
        name: 'Informações pessoais',
        path: '/app/settings',
        exact: true,
        query: Profile,
        component: loadable(() =>
          import(/* webpackChunkName: "app.settings.profile" */ '@/client/pages/App/Settings/UserInfo')
        ),
      },
      {
        name: 'Empresa',
        path: '/app/settings/empresa',
        exact: true,
        component: loadable(() =>
          import(/* webpackChunkName: "app.settings.empresa" */ '@/client/pages/App/Settings/Empresa')
        ),
      },
      {
        name: 'Aplicação',
        path: '/app/settings/application',
        exact: true,
        component: loadable(() =>
          import(/* webpackChunkName: "app.settings.application" */ '@/client/pages/App/Settings/Application')
        ),
      },
    ],
  },
];
