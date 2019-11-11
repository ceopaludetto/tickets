import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { useLocation } from 'react-router';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { useIsomorphicLayoutEffect } from 'react-use';

import { Page, PrefetchLink } from '@/client/components/composed';

export default function Settings({ route }: RouteConfigComponentProps) {
  const location = useLocation();
  const [current, setCurrent] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (location.pathname === '/app/settings') {
      setCurrent(0);
    }

    if (location.pathname === '/app/settings/empresa') {
      setCurrent(1);
    }

    if (location.pathname === '/app/settings/application') {
      setCurrent(2);
    }
  }, [location]);

  return (
    <Page
      title="Configurações"
      helmetProps={{
        titleTemplate: '%s - Configurações | F3Desk',
      }}
      footer={
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          value={current}
        >
          {route &&
            route.routes &&
            route.routes.map(r => (
              <Tab
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={PrefetchLink as any}
                to={r.path}
                label={r.name}
              />
            ))}
        </Tabs>
      }
      notFluid
    >
      {route && renderRoutes(route.routes)}
    </Page>
  );
}
