import { Typegoose, prop } from 'typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Label extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public descricao!: string;

  @Field()
  @prop({ required: true })
  public cor!: string;
}
