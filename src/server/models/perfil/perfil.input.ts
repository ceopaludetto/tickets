import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { PoliticaInput } from '@/server/models/politica';
import { IsShortID } from '@/server/utils/isShortid';

import { PerfilInputDTO } from './perfil.dto';

export class PerfilInput implements PerfilInputDTO {
  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsString()
  @IsShortID()
  @IsOptional()
  public herda?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public politica?: PoliticaInput[];

  @IsString()
  @IsShortID()
  @IsOptional()
  public empresa?: string;
}
