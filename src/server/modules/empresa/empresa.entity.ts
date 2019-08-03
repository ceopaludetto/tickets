import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Model,
  DataType,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

import { EnumDiaPagamento, EnumPlanoHoras } from './empresa.dto';
// eslint-disable-next-line import/no-cycle
import { Funcionario } from '@/server/modules/funcionario/funcionario.entity';

@Table({
  tableName: 'Empresa',
  modelName: 'Empresa',
  freezeTableName: true,
  underscored: false,
  underscoredAll: false,
})
@ObjectType()
export class Empresa extends Model<Empresa> {
  @Field(() => ID)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public readonly ID!: string;

  @Field()
  @AllowNull(false)
  @Column({ unique: true })
  public CNPJ!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Razao_Social!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Nome_Fantasia!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Endereco!: string;

  @Field()
  @AllowNull(false)
  @Column
  public CEP!: string;

  @Field()
  @AllowNull(false)
  @Column
  public Telefone!: string;

  @Field({ nullable: true })
  @Column
  public Site?: string;

  @Field({ nullable: true })
  @Column
  public Nome_Completo?: string;

  @Field()
  @Column
  public Email!: string;

  @Field(() => [Funcionario])
  @HasMany(() => Funcionario, {
    foreignKey: 'Empresa_ID',
    as: 'Funcionarios',
  })
  public Funcionarios!: Funcionario[];

  @Field(() => EnumDiaPagamento)
  @Default(EnumDiaPagamento.D7)
  @Column(
    DataType.ENUM(
      EnumDiaPagamento.D7,
      EnumDiaPagamento.D10,
      EnumDiaPagamento.D15,
      EnumDiaPagamento.D20
    )
  )
  public Dia_Pagamento!: EnumDiaPagamento;

  @Field(() => EnumPlanoHoras)
  @Default(EnumPlanoHoras.H20)
  @Column(
    DataType.ENUM(
      EnumPlanoHoras.H20,
      EnumPlanoHoras.H40,
      EnumPlanoHoras.H60,
      EnumPlanoHoras.H80
    )
  )
  public Plano_De_Horas!: EnumPlanoHoras;

  @Field()
  @AllowNull(false)
  @CreatedAt
  @Column
  public readonly Criacao_Data!: Date;

  @Field({ nullable: true })
  @UpdatedAt
  @Column
  public readonly Atualizacao_Data?: Date;
}
