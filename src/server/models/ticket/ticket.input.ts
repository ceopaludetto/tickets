import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { LabelInput } from '@/server/models/label';

import { TicketInputDTO } from './ticket.dto';

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
  public labels?: LabelInput[];
}
