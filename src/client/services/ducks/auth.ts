import immer from 'immer';
import { Reducer } from 'redux';

import { LoginInputDTO } from '@/server/components/authentication/auth.dto';
import { ApiError } from '@/client/utils/error';
import { Thunk } from '@/client/utils/common.dto';

export const enum AuthTypes {
  REQUEST_LOGIN = 'AUTH:REQUEST_LOGIN',
  SUCCESS_LOGIN = 'AUTH:SUCCESS_LOGIN',
  FAILURE_LOGIN = 'AUTH:FAILURE_LOGIN',
}

export type AuthActions =
  | { type: AuthTypes.REQUEST_LOGIN }
  | { type: AuthTypes.SUCCESS_LOGIN; payload: any[] }
  | { type: AuthTypes.FAILURE_LOGIN; payload: ApiError };

export type AuthState = {
  loading: boolean;
  success: boolean;
  failure: boolean;
  data: any[] | ApiError;
};

export const authInitialState: AuthState = {
  loading: false,
  success: false,
  failure: false,
  data: [],
};

export const auth: Reducer<AuthState, AuthActions> = immer((state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.REQUEST_LOGIN:
      return { ...state, loading: true };
    case AuthTypes.SUCCESS_LOGIN:
      return { ...state, loading: false, success: true, data: action.payload };
    case AuthTypes.FAILURE_LOGIN:
      return { ...state, loading: false, failure: true, data: action.payload };
    default:
      return state;
  }
}, authInitialState);

export const requestLogin: Thunk<AuthState, AuthActions> = ({ email, senha }: LoginInputDTO) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: AuthTypes.REQUEST_LOGIN });
    try {
      const res = await api.post('/auth/login', { email, senha });
      dispatch({ type: AuthTypes.SUCCESS_LOGIN, payload: res.data });
    } catch (err) {
      dispatch({ type: AuthTypes.FAILURE_LOGIN, payload: err as ApiError });
    }
  };
};
