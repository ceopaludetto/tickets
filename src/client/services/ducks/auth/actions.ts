import { action } from 'typesafe-actions';

import { AuthTypes, UsuarioDTO, LoginInputDTO } from './types';
import { ApiError } from '@/client/utils/error';

export const loginRequest = (data: LoginInputDTO) => action(AuthTypes.LOGIN_REQUEST, data);

export const loginSuccess = (data: UsuarioDTO) => action(AuthTypes.LOGIN_SUCCESS, { data });

export const loginFailure = (error: ApiError) => action(AuthTypes.LOGIN_FAILURE, { error });
