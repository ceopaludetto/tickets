import { UsuarioDoc } from '@/server/models';
import { Role, CustomMatcherOptions } from '@/server/utils/common.dto';

export interface SecurityMatcherOptions {
  usuario: UsuarioDoc;
  role: Role;
  empresa?: string;
  isSameUser?: boolean;

  args?: any;
}

export type SecurityCustomMatcherOptions = Pick<SecurityMatcherOptions, 'usuario' | 'args'> & {
  customMatcher: CustomMatcherOptions;
};

export { Empresa } from '@/server/components';

export { Role };
export { CustomMatcherOptions };
