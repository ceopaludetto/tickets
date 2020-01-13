import { IsString, IsOptional } from 'class-validator';

import { RecursoInputDTO } from './recurso.dto';

export class RecursoInput implements RecursoInputDTO {
  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public descricao?: string;
}
