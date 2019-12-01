import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  DataType,
  Default,
} from 'sequelize-typescript';

import { EMPRESA } from '@/server/utils/constants';

@Table({
  freezeTableName: true,
  modelName: EMPRESA,
  tableName: EMPRESA,
})
export class Empresa extends Model<Usuario> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Column
  public razaoSocial!: string;

  @Column
  public cnpj!: string;

  @Column
  public cep!: string;

  @Column
  public telefone!: string;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
