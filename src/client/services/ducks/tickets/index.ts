import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import { TicketsState, TicketsTypes } from './types';

const INITIAL_STATE: TicketsState = {
  error: false,
  loading: false,
  data: [],
};

export default createReducer<TicketsState, ActionType<typeof Actions>>(INITIAL_STATE, {
  [TicketsTypes.LOAD_REQUEST]: state => produce(state, draft => ({ ...draft, loading: true })),
  [TicketsTypes.LOAD_SUCCESS]: (state, action) =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: false,
      data: action.payload.data,
    })),
  [TicketsTypes.LOAD_FAILURE]: (state, action) =>
    produce(state, draft => ({
      ...draft,
      loading: false,
      error: action.payload.error,
      data: [],
    })),
});

export { Actions as TicketsActions, TicketsTypes };
export { TicketSaga } from './sagas';
