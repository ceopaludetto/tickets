import { compare, hash } from 'bcryptjs';
import {
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
  Model,
  Default,
  DeletedAt,
  BeforeUpdate,
  BeforeCreate,
  Unique,
  AllowNull,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

import { Associacao } from '@/server/models/associacao';
import { USUARIO, SHORTID } from '@/server/utils/constants';

import { UsuarioDTO } from './usuario.dto';

@Table({ modelName: USUARIO, tableName: USUARIO })
export class Usuario extends Model<Usuario> implements UsuarioDTO {
  @PrimaryKey
  @Default(SHORTID)
  @Column
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

  @Default(false)
  @Column
  public sysAdmin!: boolean;

  @HasMany(() => Associacao)
  public associacoes!: Associacao[];

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
    return compare(senha, this.senha);
  }
}
