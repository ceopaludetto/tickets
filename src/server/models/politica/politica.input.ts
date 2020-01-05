import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/isShortid';

import { PoliticaInputDTO, EnumNivelAcesso, EnumTipoAcesso } from './politica.dto';

export class PoliticaInput implements PoliticaInputDTO {
  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsOptional()
  @IsEnum(EnumTipoAcesso)
  public tipo?: EnumTipoAcesso;

  @IsOptional()
  @IsEnum(EnumNivelAcesso, { each: true })
  public nivel?: EnumNivelAcesso[];

  @IsBoolean()
  @IsOptional()
  negacao?: boolean;

  @IsString()
  @IsShortID()
  @IsOptional()
  public perfilID?: string;
}
