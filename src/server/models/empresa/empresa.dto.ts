import { AssociacaoDTO, AssociacaoInputDTO } from '@/server/models/associacao';
import { UsuarioDTO, UsuarioInputDTO } from '@/server/models/usuario';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface EmpresaDTO extends BaseEntityDTO {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  nomeCompleto?: string;
  telefone: string;
  site?: string;
  email: string;
  cep: string;
  endereco: string;
  usuarios: (UsuarioDTO & { associacao: AssociacaoDTO })[];
}

export interface EmpresaInputDTO {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  nomeCompleto?: string;
  telefone?: string;
  site?: string;
  email?: string;
  cep?: string;
  endereco?: string;
  usuarios?: (UsuarioInputDTO & { associacao: AssociacaoInputDTO })[];
}
