import immer from 'immer';
import { Reducer } from 'redux';

import { Thunk } from '@/client/utils/common.dto';
import { ApiError } from '@/client/utils/error';

export const enum TicketTypes {
  REQUEST = 'TICKETS:REQUEST',
  SUCCESS = 'TICKETS:SUCCESS',
  FAILURE = 'TICKETS:FAILURE',
}

export type TicketActions =
  | { type: TicketTypes.REQUEST }
  | { type: TicketTypes.SUCCESS; payload: any[] }
  | { type: TicketTypes.FAILURE; payload: ApiError };

export type TicketState = {
  loading: boolean;
  success: boolean;
  failure: boolean;
  data: any[] | ApiError;
};

export const ticketsInitialState: TicketState = {
  loading: false,
  success: false,
  failure: false,
  data: [],
};

export const ticket: Reducer<TicketState, TicketActions> = immer(
  (state: TicketState, action: TicketActions): TicketState => {
    switch (action.type) {
      case TicketTypes.REQUEST:
        return { ...state, loading: true };
      case TicketTypes.SUCCESS:
        return { ...state, loading: false, success: true, data: action.payload };
      case TicketTypes.FAILURE:
        return { ...state, loading: false, failure: true, data: action.payload };
      default:
        return state;
    }
  },
  ticketsInitialState
);

export const requestTickets: Thunk<TicketState, TicketActions> = () => {
  return async (dispatch, getState, api) => {
    dispatch({ type: TicketTypes.REQUEST });
    try {
      const res = await api.get('/ticket');
      dispatch({ type: TicketTypes.SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: TicketTypes.FAILURE, payload: err });
    }
  };
};
