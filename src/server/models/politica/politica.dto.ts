import { PerfilDTO } from '@/server/models/perfil';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export enum EnumTipoAcesso {
  Proprio = 'PROPRIO',
  Qualquer = 'QUALQUER',
}

export enum EnumNivelAcesso {
  Ler = 'LER',
  Escrever = 'ESCREVER',
  Excluir = 'EXCLUIR',
}

export interface PoliticaDTO extends BaseEntityDTO {
  descricao: string;
  tipo: EnumTipoAcesso;
  nivel: EnumNivelAcesso[];
  negacao: boolean;
  perfilID: string;
  perfil: PerfilDTO;
}

export interface PoliticaInputDTO {
  descricao?: string;
  tipo?: EnumTipoAcesso;
  nivel?: EnumNivelAcesso[];
  negacao?: boolean;
  perfilID?: string;
}
