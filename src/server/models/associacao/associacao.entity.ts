import {
  Table,
  Column,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { Perfil } from '@/server/models/perfil';
import { Usuario } from '@/server/models/usuario';
import { ASSOCIACAO, SHORTID } from '@/server/utils/constants';

import { AssociacaoDTO } from './associacao.dto';

@Table({ modelName: ASSOCIACAO, tableName: ASSOCIACAO })
export class Associacao extends Model<Associacao> implements AssociacaoDTO {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @ForeignKey(() => Usuario)
  @Column
  public usuarioID!: string;

  @ForeignKey(() => Perfil)
  @Column
  public perfilID!: string;

  @BelongsTo(() => Empresa)
  public empresa!: Empresa;

  @BelongsTo(() => Usuario)
  public usuario!: Usuario;

  @BelongsTo(() => Perfil)
  public perfil!: Perfil;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
