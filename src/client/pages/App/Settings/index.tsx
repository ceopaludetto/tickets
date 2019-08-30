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
          <TabBarItem to="/app/settings" exact>
            Perfil
          </TabBarItem>
          <TabBarItem to="/app/settings/application" exact>
            Aplicação
          </TabBarItem>
        </TabBar>
      }
      notFluid
    >
      {route && renderRoutes(route.routes)}
    </Page>
  );
}
