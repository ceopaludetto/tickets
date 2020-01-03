import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { PoliticaInput, PoliticaInputDTO } from '@/server/models/politica';
import { IsShortID } from '@/server/utils/isShortid';

export interface PerfilInputDTO {
  nome?: string;
  descricao?: string;
  herda?: string;
  politica?: PoliticaInputDTO[];
  empresa?: string;
}

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
