import { Table, Column, ForeignKey, BelongsToMany, BelongsTo } from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { RotuloTicket } from '@/server/models/rotuloTicket';
import { Ticket } from '@/server/models/ticket';
import { BaseModel } from '@/server/utils/base.model';
import { ROTULO } from '@/server/utils/constants';

import { RotuloDTO } from './rotulo.dto';

@Table({ modelName: ROTULO, tableName: ROTULO })
export class Rotulo extends BaseModel<Rotulo> implements RotuloDTO {
  @Column
  public descricao!: string;

  @Column
  public cor!: string;

  @BelongsToMany(() => Ticket, {
    through: () => RotuloTicket,
    foreignKey: 'rotuloID',
    otherKey: 'ticketID',
    as: 'tickets',
  })
  public tickets!: (Ticket & { rotuloTicket: RotuloTicket })[];

  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @BelongsTo(() => Empresa)
  public empresa!: Empresa;
}
