import { Role, CustomMatcherOptions } from '@/server/utils/common.dto';
import { UsuarioDoc } from '@/server/models';

export interface SecurityMatcherOptions {
  usuario: UsuarioDoc;
  role: Role;
  empresa?: string;
  isSameUser?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any;
}

export type SecurityCustomMatcherOptions = Pick<SecurityMatcherOptions, 'usuario' | 'args'> & {
  customMatcher: CustomMatcherOptions;
};

export { EmpresaDoc, PerfilDoc, AssociacaoDoc } from '@/server/models';

export { Role };
export { CustomMatcherOptions };
