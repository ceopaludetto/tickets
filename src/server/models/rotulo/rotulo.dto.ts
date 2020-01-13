import { EmpresaDTO } from '@/server/models/empresa';
import { RotuloTicketDTO, RotuloTicketInputDTO } from '@/server/models/rotuloTicket';
import { TicketDTO, TicketInputDTO } from '@/server/models/ticket';
import { BaseEntityDTO } from '@/server/utils/common.dto';

export interface RotuloDTO extends BaseEntityDTO {
  descricao: string;
  cor: string;
  tickets: (TicketDTO & { rotuloTicket: RotuloTicketDTO })[];
  empresaID: string;
  empresa: EmpresaDTO;
}

export interface RotuloInputDTO {
  descricao?: string;
  cor?: string;
  empresaID?: string;
  tickets?: (TicketInputDTO & { rotuloTicket: RotuloTicketInputDTO })[];
}
