import { InstanceType } from 'typegoose';
import { Types } from 'mongoose';

import { Role } from '@/server/utils/common.dto';
import { Usuario } from '@/server/models/usuario/usuario.entity';
import { Perfil } from '@/server/models/perfil/perfil.entity';
import { Empresa } from '@/server/models/empresa/empresa.entity';

export interface SecurityMatcherOptions {
  usuario: InstanceType<Usuario>;
  role: Role;
  empresa?: Types.ObjectId;
}

export type PerfilInstance = InstanceType<Perfil>;

export type EmpresaInstance = InstanceType<Empresa>;

export { Role };
