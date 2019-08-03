import { hash, compare } from 'bcryptjs';
import {
  Table,
  Column,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
  DataType,
  Model,
  DefaultScope,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

// eslint-disable-next-line import/no-cycle
import { Empresa } from '@/server/modules/empresa/empresa.entity';

@Table({
  tableName: 'Funcionario',
  modelName: 'Funcionario',
  freezeTableName: true,
  underscored: false,
  underscoredAll: false,
})
@DefaultScope({
  include: [{ model: () => Empresa, as: 'Empresa' }],
})
@ObjectType()
export class Funcionario extends Model<Funcionario> {
  @Field(() => ID)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  public readonly ID!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Nome!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Sobrenome!: string;

  @Field()
  @AllowNull(false)
  @Column({ unique: true })
  public Email!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Senha!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Cargo!: string;

  @Field(() => Empresa)
  public Empresa!: Empresa;

  @BelongsTo(() => Empresa, {
    foreignKey: 'Empresa_ID',
    as: 'Empresa',
  })
  public Empresa_ID!: string;

  @Field()
  @AllowNull(false)
  @CreatedAt
  @Column
  public readonly Criacao_Data!: Date;

  @Field({ nullable: true })
  @UpdatedAt
  @Column
  public readonly Atualizacao_Data?: Date;

  @BeforeCreate
  @BeforeUpdate
  public static async hashPassword(instance: Funcionario) {
    if (instance.changed('Senha')) {
      const newPassword = await hash(instance.Senha, 10);
      instance.Senha = newPassword;
    }
  }

  public async comparePasswords(password: string) {
    const isValid = await compare(password, this.Senha);
    return isValid;
  }
}
