import { Table, Column, ForeignKey, DataType, Default } from 'sequelize-typescript';

import { Permissao } from '@/server/models/permissao';
import { SubRecurso } from '@/server/models/subRecurso';
import { BaseModel } from '@/server/utils/base.model';
import { PERMISSAO_SUB_RECURSO } from '@/server/utils/constants';

import { PermissaoSubRecursoDTO, TipoEnum } from './permissao.subrecurso.dto';

@Table({ tableName: PERMISSAO_SUB_RECURSO, modelName: PERMISSAO_SUB_RECURSO })
export class PermissaoSubRecurso extends BaseModel<PermissaoSubRecurso> implements PermissaoSubRecursoDTO {
  @ForeignKey(() => Permissao)
  @Column
  public permissaoID!: string;

  @ForeignKey(() => SubRecurso)
  @Column
  public subRecursoID!: string;

  @Default([TipoEnum.READ])
  @Column(DataType.ARRAY(DataType.ENUM(TipoEnum.READ, TipoEnum.WRITE, TipoEnum.UPDATE, TipoEnum.DELETE)))
  public tipo!: TipoEnum[];
}
