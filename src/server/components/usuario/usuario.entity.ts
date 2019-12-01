import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  AllowNull,
  Default,
  Unique,
} from 'sequelize-typescript';
import { compare, hash } from 'bcryptjs';

import { USUARIO } from '@/server/utils/constants';

@Table({
  freezeTableName: true,
  modelName: USUARIO,
  tableName: USUARIO,
})
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Column
  public nome!: string;

  @Column
  public sobrenome!: string;

  @Unique
  @Column
  public email!: string;

  @Column
  public senha!: string;

  @AllowNull
  @Column
  public telefone?: string;

  @Column
  public dataNascimento!: Date;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;

  @BeforeCreate
  @BeforeUpdate
  public static async addHash(instance: Usuario) {
    if (instance.changed('senha')) {
      instance.senha = await hash(instance.senha, 10);
    }
  }

  public async comparePassword(senha: string) {
    return await compare(senha, this.senha);
  }
}
