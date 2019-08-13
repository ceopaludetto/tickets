import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from 'typegoose';
import { Schema } from 'mongoose';

import { AcaoEnum, RecursoEnum, AnyOrOwnEnum } from './politica.dto';

@ObjectType()
export class Politica extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field(() => RecursoEnum)
  @prop({ enum: RecursoEnum, required: true })
  public recurso!: string;

  @Field(() => AcaoEnum)
  @prop({ enum: AcaoEnum, required: true })
  public acao!: string;

  @Field({ defaultValue: false })
  @prop({ default: false })
  public deny!: boolean;

  @Field(() => AnyOrOwnEnum)
  @prop({ enum: AnyOrOwnEnum, required: true, default: AnyOrOwnEnum.Own })
  public type!: string;
}
