import { AxiosInstance, AxiosResponse } from 'axios';
import { getContext, call, put } from 'redux-saga/effects';

import { startLoad, stopLoad } from '../global';
import { loadSuccess, loadFailure, loadRequest } from './actions';

export function* TicketSaga(action: ReturnType<typeof loadRequest>) {
  yield startLoad(action);
  const api: AxiosInstance = yield getContext('api');
  try {
    const res: AxiosResponse = yield call(api.get, '/ticket');
    yield put(loadSuccess(res.data));
    yield stopLoad(action);
  } catch (err) {
    yield put(loadFailure(err));
    yield stopLoad(action, true);
  }
}
