import { createContext } from 'react';

import { createStore, applyMiddleware, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import RootReducer, { RootSaga, ApplicationState } from '@/client/services/ducks';

import { createApi } from './api';

export function createReduxStore(initialState?: any) {
  const api = createApi();

  const saga = createSagaMiddleware({ context: { api } });
  const middlewares = [saga];

  const store: Store<ApplicationState> = createStore(
    RootReducer,
    initialState,
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))
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
