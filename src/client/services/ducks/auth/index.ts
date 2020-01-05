import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  error: false,
  loading: false,
  data: undefined,
};

export default createReducer<AuthState, ActionType<typeof Actions>>(INITIAL_STATE, {
  [AuthTypes.LOGIN_REQUEST]: state => produce(state, draft => ({ ...draft, loading: true })),
  [AuthTypes.LOGIN_SUCCESS]: (state, action) =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: false,
      data: action.payload.data,
    })),
  [AuthTypes.LOGIN_FAILURE]: (state, action) =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: action.payload.error,
      data: undefined,
    })),
});

export { Actions as AuthActions, AuthTypes };
export { AuthSaga } from './sagas';
