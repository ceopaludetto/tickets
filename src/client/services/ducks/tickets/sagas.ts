import { AxiosInstance, AxiosResponse } from 'axios';
import { getContext, call, put } from 'redux-saga/effects';

import { GlobalActions } from '../global';
import { loadSuccess, loadFailure } from './actions';

export function* TicketSaga() {
  const api: AxiosInstance = yield getContext('api');
  try {
    const res: AxiosResponse = yield call(api.get, '/ticket');
    yield put(loadSuccess(res.data));
    yield put(GlobalActions.loadSuccess());
  } catch (err) {
    yield put(loadFailure(err));
    yield put(GlobalActions.loadFailure());
  }
}
