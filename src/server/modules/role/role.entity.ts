import {
  Table,
  Column,
  Default,
  DataType,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

@Table({
  tableName: 'Role',
  modelName: 'Role',
})
@ObjectType()
export class Role extends Model<Role> {
  @Field(() => ID)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @PrimaryKey
  public ID!: string;
}
