import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { PoliticaInput, PoliticaInputDTO } from '@/server/components/Politica';
import { IsShortID } from '@/server/utils/isShortid';

export interface PerfilInputDTO {
  nome?: string;
  descricao?: string;
  herda?: string;
  politicas?: PoliticaInputDTO[];
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
  public politicas?: PoliticaInput[];

  @IsString()
  @IsShortID()
  @IsOptional()
  public empresa?: string;
}
