import { put, call } from 'redux-saga/effects';

import { api } from '@/client/providers/api';
import { Types } from '@/client/services/ducks/auth';

export function* AuthSaga() {
  try {
    const res = yield call(api.post, '/auth/login');

    yield put({
      type: Types.LOGIN_SUCCESS,
      payload: {
        data: res.data,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}
