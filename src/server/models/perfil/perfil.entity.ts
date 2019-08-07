import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop, arrayProp } from 'typegoose';
import { Schema } from 'mongoose';

import { PerfilEnum } from './perfil.dto';
import { Politica } from '../politica/politica.entity';
import { Empresa } from '../empresa/empresa.entity';

@ObjectType()
export class Perfil extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field(() => PerfilEnum)
  @prop({ required: true, enum: PerfilEnum, unique: true })
  public nome!: string;

  @Field({ nullable: true })
  @prop()
  public descricao?: string;

  @Field(() => Perfil, { nullable: true })
  @prop({ ref: Perfil })
  public herda?: Ref<Perfil>;

  @Field(() => [Politica])
  @arrayProp({ required: true, items: Politica })
  public politicas!: Politica[];

  @Field(() => Empresa)
  @prop({ required: true, ref: Empresa })
  public empresa!: Ref<Empresa>;
}
