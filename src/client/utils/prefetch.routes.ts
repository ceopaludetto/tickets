import { matchPath } from 'react-router';

import { Dispatch } from 'redux';
import { END } from 'redux-saga';

import { routes as allRoutes, Route } from '@/client/providers/route';

export function findRoute(path: string, routes: Route[]): Route {
  const cleanPath = path.split('?')[0];

  const matchingRoute = routes.find(rt =>
    matchPath(cleanPath, {
      path: rt.path,
      exact: rt.exact,
    })
  );

  if (matchingRoute && matchingRoute.children) {
    return findRoute(path, matchingRoute.children);
  }

  if (!matchingRoute) {
    throw new Error('Route not found');
  }

  return matchingRoute as Route;
}

export async function preloadRouteComponent(dispatch: Dispatch, to: string | { pathname: string }) {
  const path = typeof to === 'string' ? to : to.pathname;

  const matchingRoute = findRoute(path, allRoutes);

  if (matchingRoute && matchingRoute?.component?.load) {
    matchingRoute?.dispatches?.forEach?.(d => dispatch(d.action({ ...d.data, shouldToggleProgress: true }))); // eslint-disable-line no-unused-expressions

    return matchingRoute?.component?.load?.();
  }

  throw new Error('Route not found');
}

export async function getInitialContent(dispatch: Dispatch, currentRoute: string | { pathname: string }) {
  const path = typeof currentRoute === 'string' ? currentRoute : currentRoute.pathname;

  if (!path.includes('/api')) {
    const matchingRoute = findRoute(path, allRoutes);

    if (matchingRoute && matchingRoute?.component?.load) {
      matchingRoute?.dispatches?.forEach?.(d => dispatch(d.action(d.data))); // eslint-disable-line no-unused-expressions

      const c = await matchingRoute?.component?.load?.();

      dispatch(END);

      return c;
    }

    throw new Error('Route not found');
  }

  return null;
}
