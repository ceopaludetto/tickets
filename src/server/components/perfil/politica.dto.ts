import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { IsShortID } from '@/server/utils/isShortid';

export enum EnumTipoAcesso {
  Proprio = 'PROPRIO',
  Qualquer = 'QUALQUER',
}

export enum EnumNivelAcesso {
  Ler = 'LER',
  Escrever = 'ESCREVER',
  Excluir = 'EXCLUIR',
}

export interface PoliticaInputDTO {
  descricao?: string;
  tipo?: EnumTipoAcesso;
  nivel?: EnumNivelAcesso;
  negacao?: boolean;
  perfilID?: string;
}

export class PoliticaInput {
  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsOptional()
  @IsEnum(EnumTipoAcesso)
  public tipo?: EnumTipoAcesso;

  @IsOptional()
  @IsEnum(EnumNivelAcesso)
  public nivel?: EnumNivelAcesso;

  @IsBoolean()
  @IsOptional()
  negacao?: boolean;

  @IsString()
  @IsShortID()
  @IsOptional()
  public perfilID?: string;
}
