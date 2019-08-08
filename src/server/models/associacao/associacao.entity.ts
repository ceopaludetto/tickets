import { Typegoose, Ref, prop } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';

import { Empresa } from '../empresa/empresa.entity';
import { Perfil } from '../perfil/perfil.entity';
import { AssociacaoEnum } from './associacao.dto';

@ObjectType()
export class Associacao extends Typegoose {
  @Field(() => Empresa, { nullable: true })
  @prop({ ref: Empresa })
  public empresa?: Ref<Empresa>;

  @Field(() => Perfil)
  @prop({ ref: Perfil, required: true })
  public perfil!: Ref<Perfil>;

  @Field(() => AssociacaoEnum, { nullable: true })
  @prop({ enum: AssociacaoEnum })
  public tipo?: string;
}
