import { Typegoose, prop } from 'typegoose';
import { Schema } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Permissao extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public nome!: string;
}
