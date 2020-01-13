import { Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Empresa } from '@/server/models/empresa';
import { BaseModel } from '@/server/utils/base.model';
import { STATUS } from '@/server/utils/constants';

import { StatusDTO } from './status.dto';

@Table({ modelName: STATUS, tableName: STATUS })
export class Status extends BaseModel<Status> implements StatusDTO {
  @Column
  public nome!: string;

  @ForeignKey(() => Empresa)
  @Column
  public empresaID!: string;

  @BelongsTo(() => Empresa)
  public empresa!: Empresa;
}
