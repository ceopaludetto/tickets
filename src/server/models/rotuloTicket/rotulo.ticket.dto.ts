import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface RotuloTicketDTO extends BaseEntityDTO {
  ticketID: string;
  rotuloID: string;
}

export interface RotuloTicketInputDTO {
  ticketID?: string;
  rotuloID?: string;
}
