import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface EmpresaDTO extends BaseEntityDTO {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  nomeCompleto: string;
  telefone: string;
  site: string;
  email: string;
  cep: string;
  endereco: string;
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
}
