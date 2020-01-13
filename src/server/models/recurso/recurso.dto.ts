import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface RecursoDTO extends BaseEntityDTO {
  nome: string;
  descricao: string;
}

export interface RecursoInputDTO {
  nome?: string;
  descricao?: string;
}
