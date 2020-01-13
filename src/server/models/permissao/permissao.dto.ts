import { PermissaoSubRecursoDTO, PermissaoSubRecursoInputDTO } from '@/server/models/permissaoSubRecurso';
import { SubRecursoDTO, SubRecursoInputDTO } from '@/server/models/subRecurso';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface PermissaoDTO extends BaseEntityDTO {
  permissaoID?: string;
  herda?: PermissaoDTO;
  empresaID: string;
  nome: string;
  descricao: string;
  subRecursos: (SubRecursoDTO & { permissaoSubRecurso: PermissaoSubRecursoDTO })[];
}

export interface PermissaoInputDTO {
  permissaoID?: string;
  empresaID?: string;
  nome?: string;
  descricao?: string;
  subRecursos?: (SubRecursoInputDTO & { permissaoSubRecurso: PermissaoSubRecursoInputDTO })[];
}
