import { prop, DocumentType } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Label {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public descricao!: string;

  @Field()
  @prop({ required: true })
  public cor!: string;
}

export type LabelDoc = DocumentType<Label>;
