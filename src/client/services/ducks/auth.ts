import immer from 'immer';
import { Reducer } from 'redux';

import { LoginInputDTO } from '@/server/components/authentication/auth.dto';
import { Thunk } from '@/client/utils/common.dto';

export const enum AuthTypes {
  REQUEST = 'AUTH_LOGIN:REQUEST',
  SUCCESS = 'AUTH_LOGIN:SUCCESS',
  FAILURE = 'AUTH_LOGIN:FAILURE',
}

export type AuthActions =
  | { type: AuthTypes.REQUEST }
  | { type: AuthTypes.SUCCESS; payload: any[] }
  | { type: AuthTypes.FAILURE; payload: Error };

export type AuthState = {
  loading: boolean;
  success: boolean;
  failure: boolean;
  data: any[] | Error;
};

export const authInitialState: AuthState = {
  loading: false,
  success: false,
  failure: false,
  data: [],
};

export const auth: Reducer<AuthState, AuthActions> = immer((state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case AuthTypes.FAILURE:
      return { ...state, loading: false, failure: true, data: action.payload };
    default:
      return state;
  }
}, authInitialState);

export const requestAuth: Thunk<AuthState, AuthActions> = ({ email, senha }: LoginInputDTO) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: AuthTypes.REQUEST });
    try {
      const res = await api.post('/auth/login', { email, senha });
      dispatch({ type: AuthTypes.SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: AuthTypes.FAILURE, payload: err });
    }
  };
};
