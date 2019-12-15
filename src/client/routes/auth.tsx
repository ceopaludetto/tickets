import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { nested } from '@/client/utils/nested.routes';

export function MainRoutes() {
  return (
    <Switch>
      {nested(['1', 'children']).map(r => (
        <Route path={r.path} exact={r.exact} strict={r.strict} render={r.render} component={r.component} />
      ))}
    </Switch>
  );
}
