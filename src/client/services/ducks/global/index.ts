import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import { GlobalTypes, GlobalState } from './types';

const INITIAL_STATE: GlobalState = {
  error: false,
  loading: false,
  success: false,
};

export default createReducer<GlobalState, ActionType<typeof Actions>>(INITIAL_STATE, {
  [GlobalTypes.PAGE_REQUEST]: state =>
    produce(state, draft => ({ ...draft, loading: true, success: false, error: false })),
  [GlobalTypes.PAGE_SUCCESS]: state =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: false,
      success: true,
    })),
  [GlobalTypes.PAGE_FAILURE]: state =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: true,
      success: false,
    })),
});

export { Actions as GlobalActions, GlobalTypes };
export { stopLoad, startLoad } from './sagas';
