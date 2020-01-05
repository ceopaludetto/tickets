import { EmpresaDTO } from '@/server/models/empresa';
import { PoliticaInputDTO, PoliticaDTO } from '@/server/models/politica';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface PerfilDTO extends BaseEntityDTO {
  nome: string;
  descricao: string;
  herdaID: string;
  herda: PerfilDTO;
  politica: PoliticaDTO[];
  empresaID: string;
  empresa: EmpresaDTO;
}

export interface PerfilInputDTO {
  nome?: string;
  descricao?: string;
  herda?: string;
  politica?: PoliticaInputDTO[];
  empresa?: string;
}
