import { matchPath } from 'react-router-dom';

import { routes, Route } from '@/client/providers/route';

function findRoute(path: string, proutes: Route[]): Route {
  const matchingRoute = proutes.find(r =>
    matchPath(path, {
      path: r.path,
      exact: r.exact,
    })
  );

  if (matchingRoute && matchingRoute.routes) {
    return findRoute(path, matchingRoute.routes);
  }

  if (matchingRoute) {
    return matchingRoute;
  }

  throw new Error('Route not finded');
}

export async function preloadRouteComponent(to: string | { pathname: string }) {
  const path = typeof to === 'string' ? to : to.pathname;

  const matchingRoute = findRoute(path, routes);

  if (matchingRoute && matchingRoute.component.load) {
    await matchingRoute.component.load();
  }
}
