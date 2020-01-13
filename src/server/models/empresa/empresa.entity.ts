import { Table, Column, AllowNull, BelongsToMany } from 'sequelize-typescript';

import { Associacao } from '@/server/models/associacao';
import { Usuario } from '@/server/models/usuario';
import { BaseModel } from '@/server/utils/base.model';
import { EMPRESA } from '@/server/utils/constants';

import { EmpresaDTO } from './empresa.dto';

@Table({ modelName: EMPRESA, tableName: EMPRESA })
export class Empresa extends BaseModel<Empresa> implements EmpresaDTO {
  @Column
  public cnpj!: string;

  @Column
  public razaoSocial!: string;

  @Column
  public nomeFantasia!: string;

  @AllowNull
  @Column
  public nomeCompleto?: string;

  @Column
  public telefone!: string;

  @AllowNull
  @Column
  public site?: string;

  @Column
  public email!: string;

  @Column
  public cep!: string;

  @Column
  public endereco!: string;

  @BelongsToMany(() => Usuario, {
    through: () => Associacao,
    foreignKey: 'empresaID',
    otherKey: 'usuarioID',
    as: 'usuarios',
  })
  public usuarios!: (Usuario & { associacao: Associacao })[];
}
