import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from '@/client/providers/route';
import { ApplicationState } from '@/client/services/ducks';

export function MainRoutes() {
  const auth = useSelector((state: ApplicationState) => state.Auth);

  return (
    <Switch>
      {routes.map(r => (
        <Route
          path={r.path}
          exact={r.exact}
          strict={r.strict}
          render={({ staticContext, location, history, match }) =>
            r?.render?.({ auth, location, history, match, staticContext })
          }
          component={r.component}
        />
      ))}
      <Redirect to="/404" />
    </Switch>
  );
}
