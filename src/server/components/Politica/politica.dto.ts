import { IsEnum, IsString, IsBoolean, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/isShortid';

export enum EnumTipoAcesso {
  Qualquer = 'QUALQUER',
  Proprio = 'PROPRIO',
}

export enum EnumNivelAcesso {
  Ler = 'LER',
  Escrever = 'ESCREVER',
  Excluir = 'EXCLUIR',
}

export interface PoliticaInputDTO {
  tipo?: EnumTipoAcesso;
  nivel?: EnumNivelAcesso;
  negacao?: boolean;
  perfil?: string;
}

export class PoliticaInput implements PoliticaInputDTO {
  @IsString()
  @IsOptional()
  @IsEnum(EnumTipoAcesso)
  public tipo?: EnumTipoAcesso;

  @IsString()
  @IsOptional()
  @IsEnum(EnumNivelAcesso)
  public nivel?: EnumNivelAcesso;

  @IsOptional()
  @IsBoolean()
  public negacao?: boolean;

  @IsString()
  @IsShortID()
  @IsOptional()
  public perfil?: string;
}
