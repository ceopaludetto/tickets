import { combineReducers } from 'redux';

import Auth, { AuthActions } from './auth';
import { AuthState } from './auth/types';
import Global, { GlobalActions as Actions } from './global';
import { GlobalState } from './global/types';
import Ticket, { TicketsActions } from './tickets';
import { TicketsState } from './tickets/types';

export default combineReducers({ Auth, Ticket, Global });

export { RootSaga } from './saga';

export interface ApplicationState {
  Auth: AuthState;
  Ticket: TicketsState;
  Global: GlobalState;
}

export { AuthActions, TicketsActions, Actions };

export type ApplicationActions = typeof AuthActions & typeof TicketsActions;
