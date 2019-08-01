import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { EnumDiaPagamento, EnumPlanoHoras } from './empresa.dto';

@Entity('Empresa')
@ObjectType()
export class Empresa {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public ID: string;

  @Field()
  @Column({ unique: true })
  public CNPJ: string;

  @Field()
  @Column()
  public Razao_Social: string;

  @Field()
  @Column()
  public Nome_Fantasia: string;

  @Field()
  @Column()
  public Endereco: string;

  @Field()
  @Column()
  public CEP: string;

  @Field()
  @Column()
  public Telefone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public Site?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public Nome_Completo?: string;

  @Field()
  @Column()
  public Email: string;

  @Field(() => EnumDiaPagamento)
  @Column({
    type: 'enum',
    enum: EnumDiaPagamento,
    default: EnumDiaPagamento.D7,
  })
  public Dia_Pagamento: EnumDiaPagamento;

  @Field(() => EnumPlanoHoras)
  @Column({ type: 'enum', enum: EnumPlanoHoras, default: EnumPlanoHoras.H20 })
  public Plano_De_Horas: EnumPlanoHoras;

  @Field()
  @CreateDateColumn()
  public readonly Criacao_Data: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  public readonly Atualizacao_Data?: Date;
}
