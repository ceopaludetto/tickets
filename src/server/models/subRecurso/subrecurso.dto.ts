import { PermissaoDTO, PermissaoInputDTO } from '@/server/models/permissao';
import { PermissaoSubRecursoDTO, PermissaoSubRecursoInputDTO } from '@/server/models/permissaoSubRecurso';
import { RecursoDTO } from '@/server/models/recurso';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface SubRecursoDTO extends BaseEntityDTO {
  recursoID: string;
  recurso: RecursoDTO;
  nome: string;
  descricao?: string;
  permissoes: (PermissaoDTO & { permissaoSubRecurso: PermissaoSubRecursoDTO })[];
}

export interface SubRecursoInputDTO {
  recursoID?: string;
  nome?: string;
  descricao?: string;
  permissoes?: (PermissaoInputDTO & { permissaoSubRecurso: PermissaoSubRecursoInputDTO })[];
}
