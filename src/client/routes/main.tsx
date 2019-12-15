import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from '@/client/providers/route';

export function MainRoutes() {
  return (
    <Switch>
      {routes.map(r => (
        <Route path={r.path} exact={r.exact} strict={r.strict} render={r.render} component={r.component} />
      ))}
    </Switch>
  );
}
