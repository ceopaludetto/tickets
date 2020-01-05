import { ApiError } from '@/client/utils/error';
import { LoginInputDTO } from '@/server/components/authentication/auth.dto';
import { UsuarioDTO } from '@/server/models/usuario/usuario.dto';

export const enum AuthTypes {
  LOGIN_REQUEST = '@auth:LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth:LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth:LOGIN_FAILURE',
}

export interface AuthState {
  readonly error: boolean | ApiError;
  readonly loading: boolean;
  readonly data?: UsuarioDTO;
}

export { UsuarioDTO, LoginInputDTO };
