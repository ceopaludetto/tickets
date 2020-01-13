import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { PermissaoSubRecursoInput } from '@/server/models/permissaoSubRecurso';
import { SubRecursoInput } from '@/server/models/subRecurso';
import { IsShortID } from '@/server/utils/validations/isShortid';

import { PermissaoInputDTO } from './permissao.dto';

export class PermissaoInput implements PermissaoInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public empresaID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public usuarioID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public permissaoID?: string;

  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsArray()
  @ValidateNested({ each: true })
  public subRecursos?: (SubRecursoInput & { permissaoSubRecurso: PermissaoSubRecursoInput })[];
}
