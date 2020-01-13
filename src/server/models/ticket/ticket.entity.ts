import { Table, Column, AllowNull, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Rotulo } from '@/server/models/rotulo';
import { RotuloTicket } from '@/server/models/rotuloTicket';
import { Status } from '@/server/models/status';
import { BaseModel } from '@/server/utils/base.model';
import { TICKET } from '@/server/utils/constants';

import { TicketDTO } from './ticket.dto';

@Table({ modelName: TICKET, tableName: TICKET })
export class Ticket extends BaseModel<Ticket> implements TicketDTO {
  @AllowNull
  @Column
  public nome?: string;

  @Column
  public descricao!: string;

  @BelongsToMany(() => Rotulo, {
    through: () => RotuloTicket,
    foreignKey: 'ticketID',
    otherKey: 'rotuloID',
    as: 'rotulos',
  })
  public rotulos!: (Rotulo & { rotuloTicket: RotuloTicket })[];

  @ForeignKey(() => Status)
  @Column
  public statusID!: string;

  @BelongsTo(() => Status)
  public status!: Status;
}
