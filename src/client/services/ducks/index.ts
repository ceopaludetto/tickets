import { combineReducers } from 'redux';

import { auth, AuthState, AuthActions } from './auth';
import { ticket, TicketState, TicketActions } from './tickets';

export const reducers = combineReducers({ auth, ticket });

export type AllReducers = { auth: AuthState; ticket: TicketState };

export type AllActions = AuthActions & TicketActions;
