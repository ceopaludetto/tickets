import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import { nested } from '@/client/utils/nested.routes';

export function AppRoutes() {
  const routes = useMemo(() => nested([3, 'children']), []);

  return (
    <Switch>
      {routes.map(r => (
        <Route path={r.path} exact={r.exact} strict={r.strict} component={r.component} />
      ))}
    </Switch>
  );
}
