import { matchPath } from 'react-router';
import { AxiosInstance } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { routes as allRoutes, Route } from '@/client/providers/route';
import { AllActions, AllReducers } from '@/client/services/ducks';

export function findRoute(path: string, routes: Route[]): Route {
  const matchingRoute = routes.find(rt =>
    matchPath(path, {
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

interface GetInitialContentOptions {
  dispatch: ThunkDispatch<AllReducers, AxiosInstance, AllActions>;
  getState: () => AllReducers;
  api: AxiosInstance;
}

export async function preloadRouteComponent(
  { dispatch, getState, api }: GetInitialContentOptions,
  to: string | { pathname: string }
) {
  const path = typeof to === 'string' ? to : to.pathname;

  const matchingRoute = findRoute(path, allRoutes);

  if (matchingRoute && matchingRoute.component.load) {
    if (matchingRoute.thunks && matchingRoute.thunks.length) {
      await Promise.all(matchingRoute.thunks.map(async t => t()(dispatch, getState, api)));
    }

    return matchingRoute.component.load();
  }

  throw new Error('Route not found');
}

export async function getInitialContent(
  { dispatch, getState, api }: GetInitialContentOptions,
  currentRoute: string | { pathname: string }
) {
  const path = typeof currentRoute === 'string' ? currentRoute : currentRoute.pathname;

  if (!path.includes('/api')) {
    const matchingRoute = findRoute(path, allRoutes);

    if (matchingRoute && matchingRoute.component.load) {
      const c = await matchingRoute.component.load();

      if (matchingRoute.thunks && matchingRoute.thunks.length) {
        await Promise.all(matchingRoute.thunks.map(async t => t()(dispatch, getState, api)));
      }

      return c;
    }

    throw new Error('Route not found');
  }

  return null;
}
