import { TicketDTO } from '@/server/models/ticket';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface LabelDTO extends BaseEntityDTO {
  descricao: string;
  cor: string;
  ticketID: string;
  ticket: TicketDTO;
}

export interface LabelInputDTO {
  descricao?: string;
  cor?: string;
  ticketID?: string;
}
