import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { PermissaoSubRecursoInputDTO, TipoEnum } from './permissao.subrecurso.dto';

export class PermissaoSubRecursoInput implements PermissaoSubRecursoInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public permissaoID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public subRecursoID?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(TipoEnum, { each: true })
  public tipo?: TipoEnum[];
}
