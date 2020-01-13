import { RotuloDTO, RotuloInputDTO } from '@/server/models/rotulo';
import { RotuloTicketDTO, RotuloTicketInputDTO } from '@/server/models/rotuloTicket';
import { StatusDTO } from '@/server/models/status';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface TicketDTO extends BaseEntityDTO {
  nome?: string;
  descricao: string;
  rotulos: (RotuloDTO & { rotuloTicket: RotuloTicketDTO })[];
  statusID: string;
  status: StatusDTO;
}

export interface TicketInputDTO {
  nome?: string;
  descricao?: string;
  rotulos?: (RotuloInputDTO & { rotuloTicket: RotuloTicketInputDTO })[];
  statusID?: string;
}
