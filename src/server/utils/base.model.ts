import { Model, PrimaryKey, Default, Column, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

import { BaseEntityDTO } from './common.dto';
import { SHORTID } from './constants';

export class BaseModel<T> extends Model<T> implements BaseEntityDTO {
  @PrimaryKey
  @Default(SHORTID)
  @Column
  public id!: string;

  @CreatedAt
  public dataCriacao!: Date;

  @UpdatedAt
  public dataAtualizacao!: Date;

  @DeletedAt
  public dataExclusao!: Date;
}
