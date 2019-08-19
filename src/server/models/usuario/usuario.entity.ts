import { hash, compare } from 'bcryptjs';
import {
  Typegoose,
  prop,
  instanceMethod,
  pre,
  arrayProp,
  InstanceType,
} from 'typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

import { Associacao } from '../associacao/associacao.entity';

@pre<Usuario>('save', async function preSave(next) {
  if (this.isModified('senha')) {
    const newPassword = await hash(this.senha, 10);
    this.senha = newPassword;
  }
  next();
})
@ObjectType()
export class Usuario extends Typegoose {
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

  @Field(() => [Associacao])
  @arrayProp({ items: Associacao, required: true })
  public associacoes!: Associacao[];

  @Field()
  @prop({ required: true, default: false })
  public sysAdmin!: boolean;

  @instanceMethod
  public async comparePasswords(password: string) {
    const isValid = await compare(password, this.senha);
    return isValid;
  }
}

export type UsuarioInstance = InstanceType<Usuario>;
