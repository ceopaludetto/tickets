import { Table, Column, ForeignKey, AllowNull, BelongsTo, BelongsToMany } from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { PermissaoSubRecurso } from '@/server/models/permissaoSubRecurso';
import { SubRecurso } from '@/server/models/subRecurso';
import { BaseModel } from '@/server/utils/base.model';
import { PERMISSAO } from '@/server/utils/constants';

import { PermissaoDTO } from './permissao.dto';

@Table({ modelName: PERMISSAO, tableName: PERMISSAO })
export class Permissao extends BaseModel<Permissao> implements PermissaoDTO {
  @ForeignKey(() => Permissao)
  @AllowNull
  @Column
  public permissaoID?: string;

  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @BelongsTo(() => Permissao)
  public herda?: Permissao;

  @Column
  public nome!: string;

  @Column
  public descricao!: string;

  @BelongsToMany(() => SubRecurso, {
    through: () => PermissaoSubRecurso,
    foreignKey: 'permissaoID',
    otherKey: 'subRecursoID',
    as: 'subRecursos',
  })
  public subRecursos!: (SubRecurso & { permissaoSubRecurso: PermissaoSubRecurso })[];
}
