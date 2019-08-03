import { Typegoose, prop, mapProp } from 'typegoose';
import { Schema } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class MapDefinitions {
  @Field()
  public read!: boolean;

  @Field()
  public write!: boolean;

  @Field()
  public delete!: boolean;
}

@ObjectType()
export class Permissao extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public nome!: string;

  @Field()
  @mapProp({ required: true })
  public definitions!: Map<string, MapDefinitions | Permissao>;
}
