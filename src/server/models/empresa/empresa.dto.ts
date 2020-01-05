import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface EmpresaDTO extends BaseEntityDTO {
  razaoSocial: string;
  cnpj: string;
  cep: string;
  telefone: string;
}

export interface EmpresaInputDTO {
  razaoSocial?: string;
  cnpj?: string;
  cep?: string;
  telefone?: string;
}
