import { Ref, prop, DocumentType } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

import { Empresa } from '../empresa/empresa.entity';
import { Perfil } from '../perfil/perfil.entity';
import { AssociacaoEnum } from './associacao.dto';

@ObjectType()
export class Associacao {
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

export type AssociacaoDoc = DocumentType<Associacao>;
