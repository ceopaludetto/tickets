import { createContext } from 'react';

import { createStore, applyMiddleware, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import { createApi } from './api';
import RootReducer, { RootSaga, ApplicationState } from '@/client/services/ducks';
import { IS_PRODUCTION } from '@/client/utils/constants';

export function createReduxStore(initialState?: any) {
  const api = createApi();

  const saga = createSagaMiddleware({ context: { api } });
  const middlewares = [saga];

  const store: Store<ApplicationState> = createStore(
    RootReducer,
    initialState,
    IS_PRODUCTION ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))
  );

  const tasks = saga.run(RootSaga);

  if (module.hot) {
    module.hot.accept('@/client/services/ducks', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('@/client/services/ducks').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, api, tasks };
}

export const TaskContext = createContext<{ task?: Task }>({ task: undefined });
