import {
  Table,
  Model,
  Column,
  Default,
  PrimaryKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  HasOne,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';

import { Politica } from '../Politica';
import { Empresa } from '../Empresa';
import { PERFIL, SHORTID } from '@/server/utils/constants';

@Table({ modelName: PERFIL, tableName: PERFIL })
export class Perfil extends Model<Perfil> {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @Column
  public nome!: string;

  @Column
  public descricao!: string;

  @AllowNull
  @HasOne(() => Perfil)
  public herda!: Perfil;

  @HasMany(() => Politica)
  public politicas!: Politica[];

  @HasOne(() => Empresa)
  public empresa!: Empresa;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
