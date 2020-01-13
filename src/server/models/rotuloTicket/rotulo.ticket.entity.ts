import { Table, Column, ForeignKey } from 'sequelize-typescript';

import { Rotulo } from '@/server/models/rotulo';
import { Ticket } from '@/server/models/ticket';
import { BaseModel } from '@/server/utils/base.model';
import { ROTULO_TICKET } from '@/server/utils/constants';

import { RotuloTicketDTO } from './rotulo.ticket.dto';

@Table({ modelName: ROTULO_TICKET, tableName: ROTULO_TICKET })
export class RotuloTicket extends BaseModel<RotuloTicket> implements RotuloTicketDTO {
  @ForeignKey(() => Ticket)
  @Column
  public ticketID!: string;

  @ForeignKey(() => Rotulo)
  @Column
  public rotuloID!: string;
}
