import { Table, Column } from 'sequelize-typescript';

import { BaseModel } from '@/server/utils/base.model';
import { RECURSO } from '@/server/utils/constants';

import { RecursoDTO } from './recurso.dto';

@Table({ tableName: RECURSO, modelName: RECURSO })
export class Recurso extends BaseModel<Recurso> implements RecursoDTO {
  @Column
  public nome!: string;

  @Column
  public descricao!: string;
}
