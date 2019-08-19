import { Typegoose, prop, InstanceType } from 'typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

import { EnumDiaPagamento, EnumPlanoHoras } from './empresa.dto';

@ObjectType()
export class Empresa extends Typegoose {
  @Field(() => ID)
  public readonly _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ unique: true, required: true })
  public cnpj!: string;

  @Field()
  @prop({ required: true })
  public razaoSocial!: string;

  @Field()
  @prop({ required: true })
  public nomeFantasia!: string;

  @Field()
  @prop({ required: true })
  public endereco!: string;

  @Field()
  @prop({ required: true })
  public cep!: string;

  @Field()
  @prop({ required: true })
  public telefone!: string;

  @Field({ nullable: true })
  @prop()
  public site?: string;

  @Field({ nullable: true })
  @prop()
  public nomeCompleto?: string;

  @Field()
  @prop({ required: true, unique: true })
  public email!: string;

  @Field(() => EnumDiaPagamento, { defaultValue: EnumDiaPagamento.D7 })
  @prop({
    enum: EnumDiaPagamento,
    default: EnumDiaPagamento.D7,
  })
  public diaPagamento!: string;

  @Field(() => EnumPlanoHoras, { defaultValue: EnumPlanoHoras.H20 })
  @prop({
    enum: EnumPlanoHoras,
    default: EnumPlanoHoras.H20,
  })
  public planoHoras!: string;
}

export type EmpresaInstance = InstanceType<Empresa>;
