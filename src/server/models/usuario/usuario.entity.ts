import { compare, hash } from 'bcryptjs';
import {
  Table,
  Column,
  Default,
  BeforeUpdate,
  BeforeCreate,
  Unique,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';

import { Associacao } from '@/server/models/associacao';
import { Empresa } from '@/server/models/empresa';
import { BaseModel } from '@/server/utils/base.model';
import { USUARIO } from '@/server/utils/constants';

import { UsuarioDTO } from './usuario.dto';

@Table({ modelName: USUARIO, tableName: USUARIO })
export class Usuario extends BaseModel<Usuario> implements UsuarioDTO {
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

  @BelongsToMany(() => Empresa, {
    through: () => Associacao,
    foreignKey: 'usuarioID',
    otherKey: 'empresaID',
    as: 'empresas',
  })
  public empresas!: (Empresa & { associacao: Associacao })[];

  @Column
  public dataNascimento!: Date;

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
