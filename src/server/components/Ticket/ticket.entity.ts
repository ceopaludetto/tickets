import {
  Table,
  Column,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
  DefaultScope,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

import { TICKET, SHORTID } from '@/server/utils/constants';
import { Label } from '@/server/components/Label';

@DefaultScope({
  include: [() => Label],
})
@Table({ modelName: TICKET, tableName: TICKET })
export class Ticket extends Model<Ticket> {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @AllowNull
  @Column
  public nome?: string;

  @Column
  public descricao!: string;

  @HasMany(() => Label)
  public labels!: Label[];

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
