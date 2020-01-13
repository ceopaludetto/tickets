import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface AssociacaoDTO extends BaseEntityDTO {
  empresaID: string;
  usuarioID: string;
}

export interface AssociacaoInputDTO {
  empresaID?: string;
  usuarioID?: string;
}
