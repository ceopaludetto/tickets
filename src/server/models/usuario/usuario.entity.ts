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
import { AssociacaoEnum } from '../associacao/associacao.dto';
import { Perfil } from '../perfil/perfil.entity';
import { Role } from '@/server/utils/common.dto';
import { PerfilEnum } from '../perfil/perfil.dto';

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

  @instanceMethod
  public async compareRole(role: Role, empresa?: Schema.Types.ObjectId) {
    // Se uma empresa foi passada, procure a autorização pela empresa
    if (empresa) {
      const associacao = this.associacoes.find(a => a.empresa === empresa);
      if (!associacao) {
        return false;
      }
    }

    // Se nenhuma empresa foi passada, verificar se é um usuário comum
    if (role.perfil === PerfilEnum.User) {
      console.log('é user');
      const associacao = this.associacoes.find(
        a => (a.perfil as InstanceType<Perfil>).nome === PerfilEnum.User
      );
      console.log('tem user?', associacao);
      if (!associacao) {
        return false;
      }

      const isValid = (associacao.perfil as InstanceType<
        Perfil
      >).politicas.find(
        p => p.acao === role.acao && p.recurso === role.recurso
      );
      console.log('a acao e o recurso do user é valida?', isValid);

      if (!isValid) {
        return false;
      }
    }

    // Se também não é usuário comum, verificar a primeira empresa do tipo funcionario
    const associacao = this.associacoes.find(
      a => a.tipo === AssociacaoEnum.Funcionario
    );
    console.log('Tem alguma associacao do tipo funcionario?');

    if (!associacao) {
      return false;
    }
    console.log('Se nao tem, abraço');

    if ((associacao.perfil as InstanceType<Perfil>).nome !== role.perfil) {
      return false;
    }

    const isValid = (associacao.perfil as InstanceType<Perfil>).politicas.find(
      p => p.acao === role.acao && p.recurso === role.recurso
    );

    if (!isValid) {
      return false;
    }

    return true;
  }
}
