import { ObjectType, Field, ID } from 'type-graphql';
import { Ref, prop, arrayProp, DocumentType } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

import { Politica } from '../politica/politica.entity';
import { Empresa } from '../empresa/empresa.entity';

@ObjectType()
export class Perfil {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
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

export type PerfilDoc = DocumentType<Perfil>;
