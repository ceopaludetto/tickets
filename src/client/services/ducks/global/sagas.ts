import { fork, put } from 'redux-saga/effects';

import { loadRequest, loadFailure, loadSuccess } from './actions';

export const startLoad = (action: { payload: { shouldToggleProgress?: boolean } }) =>
  fork(function* start() {
    if (action?.payload?.shouldToggleProgress) yield put(loadRequest());
  });

export const stopLoad = (action: { payload: { shouldToggleProgress?: boolean } }, failure?: boolean) =>
  fork(function* stop() {
    if (action?.payload?.shouldToggleProgress) {
      if (failure) {
        yield put(loadFailure());
      } else {
        yield put(loadSuccess());
      }
    }
  });
