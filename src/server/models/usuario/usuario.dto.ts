import { AssociacaoDTO, AssociacaoInputDTO } from '@/server/models/associacao';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface UsuarioDTO extends BaseEntityDTO {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  telefone?: string;
  dataNascimento: Date;
  associacoes: AssociacaoDTO[];
}

export interface UsuarioInputDTO {
  nome?: string;
  sobrenome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  dataNascimento?: Date;
  associacoes?: AssociacaoInputDTO[];
}
