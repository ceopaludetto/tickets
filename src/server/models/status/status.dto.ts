import { EmpresaDTO } from '@/server/models/empresa';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface StatusDTO extends BaseEntityDTO {
  empresaID: string;
  empresa: EmpresaDTO;
  nome: string;
}

export interface StatusInputDTO {
  empresaID?: string;
  nome?: string;
}
