import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { RotuloInput } from '@/server/models/rotulo';
import { RotuloTicketInput } from '@/server/models/rotuloTicket';
import { IsShortID } from '@/server/utils/validations/isShortid';

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
  public rotulos?: (RotuloInput & { rotuloTicket: RotuloTicketInput })[];

  @IsString()
  @IsOptional()
  @IsShortID()
  public statusID?: string;
}
