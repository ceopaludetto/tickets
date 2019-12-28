import {
  Table,
  Default,
  Column,
  DataType,
  PrimaryKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Model,
} from 'sequelize-typescript';

import { Perfil } from './perfil.entity'; // eslint-disable-line import/no-cycle
import { EnumNivelAcesso, EnumTipoAcesso } from './politica.dto';
import { POLITICA, SHORTID } from '@/server/utils/constants';

@Table({ modelName: POLITICA, tableName: POLITICA })
export class Politica extends Model<Politica> {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @AllowNull
  @Column
  public descricao!: string;

  @Default(EnumTipoAcesso.Proprio)
  @Column(DataType.ENUM(EnumTipoAcesso.Qualquer, EnumTipoAcesso.Proprio))
  public tipo!: EnumTipoAcesso;

  @Default(EnumNivelAcesso.Ler)
  @Column(DataType.ENUM(EnumNivelAcesso.Ler, EnumNivelAcesso.Escrever, EnumNivelAcesso.Excluir))
  public nivel!: EnumNivelAcesso;

  @Default(false)
  @Column
  public negacao!: boolean;

  @ForeignKey(() => Perfil)
  @Column
  public perfilID!: string;

  @BelongsTo(() => Perfil)
  public perfil!: Perfil;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
