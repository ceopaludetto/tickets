import { IsString, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { SubRecursoInputDTO } from './subrecurso.dto';

export class SubRecursoInput implements SubRecursoInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public recursoID?: string;

  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public descricao?: string;
}
