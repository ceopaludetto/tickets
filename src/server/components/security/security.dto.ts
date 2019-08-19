import { Types } from 'mongoose';

import { Role } from '@/server/utils/common.dto';
import { UsuarioInstance } from '@/server/models';

export interface SecurityMatcherOptions {
  usuario: UsuarioInstance;
  role: Role;
  empresa?: Types.ObjectId;
  isSameUser?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any;
}

export {
  EmpresaInstance,
  UsuarioInstance,
  PerfilInstance,
  AssociacaoInstance,
} from '@/server/models';

export { Role };
