import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { AxiosInstance } from 'axios';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { reducers, AllReducers, AllActions } from '@/client/services/ducks';
import { IS_PRODUCTION } from '@/client/utils/constants';
import { createApi } from './api';

export type ThunkType = ThunkMiddleware<AllReducers, AllActions, AxiosInstance>;

export function createReduxStore(initialState?: any) {
  const api = createApi();

  const store = createStore(
    reducers,
    initialState,
    IS_PRODUCTION
      ? applyMiddleware(thunk.withExtraArgument(api) as ThunkType)
      : composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api) as ThunkType))
  );

  if (module.hot) {
    module.hot.accept('@/client/services/ducks', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('@/client/services/ducks').reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, api };
}
