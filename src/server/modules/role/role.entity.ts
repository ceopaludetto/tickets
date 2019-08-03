import {
  Table,
  Column,
  Default,
  DataType,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AllowNull,
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

  @Field()
  @Column
  public Nome!: string;

  @Field()
  @AllowNull(false)
  @CreatedAt
  @Column
  public Criacao_Data!: Date;

  @Field({ nullable: true })
  @UpdatedAt
  @Column
  public Atualizacao_Data?: Date;
}
