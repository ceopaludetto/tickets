import { Table, Column, PrimaryKey, Default, CreatedAt, UpdatedAt, DeletedAt, Model } from 'sequelize-typescript';

import { EMPRESA, SHORTID } from '@/server/utils/constants';

@Table({ modelName: EMPRESA, tableName: EMPRESA })
export class Empresa extends Model<Empresa> {
  @PrimaryKey
  @Default(SHORTID)
  @Column
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
