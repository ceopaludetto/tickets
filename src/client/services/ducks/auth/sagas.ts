import { AxiosInstance, AxiosResponse } from 'axios';
import { getContext, call, put } from 'redux-saga/effects';

import { loginFailure, loginSuccess, loginRequest } from './actions';

export function* AuthSaga(action: ReturnType<typeof loginRequest>) {
  const api: AxiosInstance = yield getContext('api');
  try {
    const res: AxiosResponse = yield call(api.post, '/auth/login', action.payload);
    yield put(loginSuccess(res.data));
  } catch (err) {
    yield put(loginFailure(err));
  }
}
