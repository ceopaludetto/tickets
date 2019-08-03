import { Typegoose, prop, arrayProp } from 'typegoose';
import { Schema } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';

import { Permissao } from './permissao.entity';

@ObjectType()
export class Role extends Typegoose {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public nome!: string;

  @Field()
  @arrayProp({ itemsRef: Permissao, required: true })
  public permissoes!: Permissao[];
}
