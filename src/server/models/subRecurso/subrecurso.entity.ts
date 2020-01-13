import { Table, Column, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';

import { Permissao } from '@/server/models/permissao';
import { PermissaoSubRecurso } from '@/server/models/permissaoSubRecurso';
import { Recurso } from '@/server/models/recurso';
import { BaseModel } from '@/server/utils/base.model';
import { SUB_RECURSO } from '@/server/utils/constants';

import { SubRecursoDTO } from './subrecurso.dto';

@Table({ modelName: SUB_RECURSO, tableName: SUB_RECURSO })
export class SubRecurso extends BaseModel<SubRecurso> implements SubRecursoDTO {
  @Column
  public nome!: string;

  @Column
  public descricao?: string;

  @ForeignKey(() => Recurso)
  @Column
  public recursoID!: string;

  @BelongsTo(() => Recurso)
  public recurso!: Recurso;

  @BelongsToMany(() => Permissao, {
    through: () => PermissaoSubRecurso,
    foreignKey: 'subRecursoID',
    otherKey: 'permissaoID',
    as: 'permissoes',
  })
  public permissoes!: (Permissao & { permissaoSubRecurso: PermissaoSubRecurso })[];
}
