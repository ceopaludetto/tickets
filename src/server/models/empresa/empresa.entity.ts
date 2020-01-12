import { Table, Column, PrimaryKey, Default, CreatedAt, UpdatedAt, DeletedAt, Model } from 'sequelize-typescript';

import { EMPRESA, SHORTID } from '@/server/utils/constants';

import { EmpresaDTO } from './empresa.dto';

@Table({ modelName: EMPRESA, tableName: EMPRESA })
export class Empresa extends Model<Empresa> implements EmpresaDTO {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @Column
  public cnpj!: string;

  @Column
  public razaoSocial!: string;

  @Column
  public nomeFantasia!: string;

  @Column
  public nomeCompleto!: string;

  @Column
  public telefone!: string;

  @Column
  public site!: string;

  @Column
  public email!: string;

  @Column
  public cep!: string;

  @Column
  public endereco!: string;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
