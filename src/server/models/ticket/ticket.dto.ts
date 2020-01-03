import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { LabelInput, LabelInputDTO } from '@/server/models/label/label.dto';

export interface TicketInputDTO {
  nome?: string;
  descricao?: string;
  label?: LabelInputDTO[];
}

export class TicketInput implements TicketInputDTO {
  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public label?: LabelInput[];
}
