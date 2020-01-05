import {
  Table,
  Model,
  Column,
  Default,
  PrimaryKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DefaultScope,
} from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { Politica } from '@/server/models/politica'; // eslint-disable-line import/no-cycle
import { PERFIL, SHORTID } from '@/server/utils/constants';

import { PerfilDTO } from './perfil.dto';

@DefaultScope({
  include: [() => Politica, () => Empresa],
})
@Table({ modelName: PERFIL, tableName: PERFIL })
export class Perfil extends Model<Perfil> implements PerfilDTO {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @Column
  public nome!: string;

  @Column
  public descricao!: string;

  @AllowNull
  @ForeignKey(() => Perfil)
  @Column
  public herdaID!: string;

  @BelongsTo(() => Perfil)
  public herda!: Perfil;

  @HasMany(() => Politica)
  public politica!: Politica[];

  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @BelongsTo(() => Empresa)
  public empresa!: Empresa;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
