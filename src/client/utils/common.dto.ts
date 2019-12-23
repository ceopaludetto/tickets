import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { AllReducers, AllActions } from '@/client/services/ducks';

export type Thunk<S = AllReducers, A extends Action<any> = AllActions> = (
  ...args: any[]
) => (
  dispatch: ThunkDispatch<S, AxiosInstance, A>,
  getState: () => AllReducers,
  api: AxiosInstance
) => void | Promise<void>;
