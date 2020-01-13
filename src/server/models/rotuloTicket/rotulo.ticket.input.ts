import { IsString, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { RotuloTicketInputDTO } from './rotulo.ticket.dto';

export class RotuloTicketInput implements RotuloTicketInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public ticketID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public rotuloID?: string;
}
