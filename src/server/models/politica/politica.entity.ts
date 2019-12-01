import { ObjectType, Field, ID } from 'type-graphql';
import { prop, arrayProp, DocumentType } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

import { AcaoEnum, RecursoEnum, AnyOrOwnEnum } from './politica.dto';

@ObjectType()
export class Politica {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field(() => RecursoEnum)
  @prop({ enum: RecursoEnum, required: true })
  public recurso!: string;

  @Field(() => [AcaoEnum])
  @arrayProp({ enum: AcaoEnum, required: true, items: String })
  public acao!: string[];

  @Field({ defaultValue: false })
  @prop({ default: false })
  public negacao!: boolean;

  @Field(() => AnyOrOwnEnum)
  @prop({ enum: AnyOrOwnEnum, required: true, default: AnyOrOwnEnum.Own })
  public tipo!: string;
}

export type PoliticaDoc = DocumentType<Politica>;
