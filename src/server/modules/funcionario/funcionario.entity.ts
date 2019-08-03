import { hash, compare } from 'bcryptjs';
import { Typegoose, Ref, prop, instanceMethod, pre } from 'typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

import { Empresa } from '@/server/modules/empresa/empresa.entity';

@pre<Funcionario>('save', async function preSave(next) {
  if (this.isModified('senha')) {
    const newPassword = await hash(this.senha, 10);
    this.senha = newPassword;
  }
  next();
})
@ObjectType()
export class Funcionario extends Typegoose {
  @Field(() => ID)
  public readonly _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public nome!: string;

  @Field()
  @prop({ required: true })
  public sobrenome!: string;

  @Field()
  @prop({ required: true, unique: true })
  public email!: string;

  @Field()
  @prop({ required: true })
  public senha!: string;

  @Field()
  @prop({ required: true })
  public cargo!: string;

  @Field(() => Empresa)
  @prop({ ref: Empresa })
  public empresa!: Ref<Empresa>;

  @instanceMethod
  public async comparePasswords(password: string) {
    const isValid = await compare(password, this.senha);
    return isValid;
  }
}
