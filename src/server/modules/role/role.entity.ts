import { Typegoose, prop } from 'typegoose';
import { Schema } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Role extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public Nome!: string;
}
