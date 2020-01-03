import {
  Table,
  Model,
  PrimaryKey,
  Default,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';

import { Ticket } from '@/server/models/ticket';
import { LABEL, SHORTID } from '@/server/utils/constants';

@Table({ modelName: LABEL, tableName: LABEL })
export class Label extends Model<Label> {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @Column
  public descricao!: string;

  @Column
  public cor!: string;

  @ForeignKey(() => Ticket)
  @Column
  public ticketID!: string;

  @BelongsTo(() => Ticket)
  public ticket!: Ticket;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
