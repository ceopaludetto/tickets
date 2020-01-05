import { Usuario } from '@/server/models/usuario';
import { Role, CustomMatcherOptions } from '@/server/utils/common.dto';

export interface SecurityMatcherOptions {
  usuario: Usuario;
  role: Role;
  empresa?: string;
  isSameUser?: boolean;
  args?: any;
}

export type SecurityCustomMatcherOptions = Pick<SecurityMatcherOptions, 'usuario' | 'args'> & {
  customMatcher: CustomMatcherOptions;
};

export { Perfil } from '@/server/models/perfil';

export { Role };
export { CustomMatcherOptions };
