import { BaseEntityDTO } from '@/server/utils/common.dto';

export enum TipoEnum {
  READ = 'READ',
  WRITE = 'WRITE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface PermissaoSubRecursoDTO extends BaseEntityDTO {
  permissaoID: string;
  subRecursoID: string;
  tipo: TipoEnum[];
}

export interface PermissaoSubRecursoInputDTO {
  permissaoID?: string;
  subRecursoID?: string;
  tipo?: TipoEnum[];
}
