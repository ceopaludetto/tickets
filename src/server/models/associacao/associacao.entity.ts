import { Typegoose, Ref, prop, InstanceType } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';

import { Empresa } from '../empresa/empresa.entity';
import { Perfil } from '../perfil/perfil.entity';
import { AssociacaoEnum } from './associacao.dto';

@ObjectType()
export class Associacao extends Typegoose {
  @Field(() => Empresa)
  @prop({ ref: Empresa, required: true })
  public empresa!: Ref<Empresa>;

  @Field(() => Perfil, { nullable: true })
  @prop({ ref: Perfil })
  public perfil?: Ref<Perfil>;

  @Field(() => AssociacaoEnum, { nullable: true })
  @prop({ enum: AssociacaoEnum })
  public tipo?: string;
}

export type AssociacaoInstance = InstanceType<Associacao>;
