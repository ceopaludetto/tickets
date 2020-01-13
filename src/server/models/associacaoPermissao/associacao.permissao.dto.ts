import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface AssociacaoPermissaoDTO extends BaseEntityDTO {
  associacaoID: string;
  permissaoID: string;
}

export interface AssociacaoPermissaoInputDTO {
  associacaoID?: string;
  permissaoID?: string;
}
