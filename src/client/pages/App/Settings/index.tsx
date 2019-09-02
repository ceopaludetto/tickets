import React from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';

import { Page, TabBar, TabBarItem } from '@/client/components/composed';

export default function Settings({ route }: RouteConfigComponentProps) {
  return (
    <Page
      title="Configurações"
      subTitle="Visão Geral"
      helmetProps={{ titleTemplate: '%s - Configurações | F3Desk' }}
      footer={
        <TabBar>
          {route &&
            route.routes &&
            route.routes.map(r => (
              <TabBarItem to={r.path as string} exact={r.exact}>
                {r.name}
              </TabBarItem>
            ))}
        </TabBar>
      }
      notFluid
    >
      {route && renderRoutes(route.routes)}
    </Page>
  );
}
