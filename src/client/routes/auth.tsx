import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import { nested } from '@/client/utils/nested.routes';

export function AuthRoutes() {
  const routes = useMemo(() => nested([1, 'children']), []);

  return (
    <Switch>
      {routes.map(r => (
        <Route path={r.path} exact={r.exact} strict={r.strict} render={r.render} component={r.component} />
      ))}
    </Switch>
  );
}
