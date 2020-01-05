import React, { useMemo } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { nested } from '@/client/utils/nested.routes';

export function AuthRoutes() {
  const routes = useMemo(() => nested([2, 'children']), []);
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      {routes.map(r => (
        <Route path={r.path} exact={r.exact} strict={r.strict} component={r.component} />
      ))}
    </Switch>
  );
}
