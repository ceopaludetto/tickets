import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes, AuthSaga } from './auth';
import { TicketsTypes, TicketSaga } from './tickets';

export function* RootSaga() {
  return yield all([takeLatest(AuthTypes.LOGIN_REQUEST, AuthSaga), takeLatest(TicketsTypes.LOAD_REQUEST, TicketSaga)]);
}
