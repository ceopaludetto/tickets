import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducers } from '@/client/services/ducks';
import { root } from '@/client/services/sagas';
import { IS_PRODUCTION } from '@/client/utils/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createReduxStore(initialState?: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initialState,
    IS_PRODUCTION ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  if (module.hot) {
    module.hot.accept('@/client/services/ducks', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('@/client/services/ducks').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(root);

  return store;
}
