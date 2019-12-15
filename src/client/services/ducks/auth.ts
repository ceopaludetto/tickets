import { ReducerType, CreatorType } from '@/client/utils/common.dto';
import { LoginInputDTO } from '@/server/components/authentication/auth.dto';

export const enum Types {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

export const InitialState = {
  loading: false,
  success: false,
  failure: false,
  data: [],
};

export const Reducer: ReducerType<typeof InitialState, Types> = (state = InitialState, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload.data,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true,
        data: action.payload.error,
      };
    default:
      return state;
  }
};

export const Creators: CreatorType<Types> = {
  requestLogin: ({ email, senha }: LoginInputDTO) => ({
    type: Types.LOGIN_REQUEST,
    payload: {
      email,
      senha,
    },
  }),
  successLogin: data => ({
    type: Types.LOGIN_SUCCESS,
    payload: {
      data,
    },
  }),
  failureLogin: (error: Error) => ({
    type: Types.LOGIN_FAILURE,
    payload: {
      error,
    },
  }),
};
