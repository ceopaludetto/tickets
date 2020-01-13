import { IsString, IsOptional, IsHexColor, IsArray, ValidateNested } from 'class-validator';

import { RotuloTicketInput } from '@/server/models/rotuloTicket';
import { TicketInput } from '@/server/models/ticket';
import { IsShortID } from '@/server/utils/validations/isShortid';

import { RotuloInputDTO } from './rotulo.dto';

export class RotuloInput implements RotuloInputDTO {
  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  public cor?: string;

  @IsShortID()
  @IsString()
  @IsOptional()
  public empresaID?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public tickets?: (TicketInput & { rotuloTicket: RotuloTicketInput })[];
}
