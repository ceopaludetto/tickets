import { prop, arrayProp, Ref, DocumentType } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Schema } from 'mongoose';

import { Usuario } from '../usuario/usuario.entity';
import { Label } from '../label/label.entity';
import { TicketStatusEnum } from './ticket.dto';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  public _id!: Schema.Types.ObjectId;

  @Field()
  @prop({ required: true })
  public nome!: string;

  @Field()
  @prop({ required: true })
  public descricao!: string;

  @Field(() => Usuario)
  @prop({ ref: Usuario, required: true })
  public usuario!: Ref<Usuario>;

  @Field(() => TicketStatusEnum)
  @prop({
    enum: TicketStatusEnum,
    default: TicketStatusEnum.Pendente,
    required: true,
  })
  public status!: string;

  @Field(() => [Label], { nullable: true })
  @arrayProp({ items: Label })
  public labels?: Label[];
}

export type TicketDoc = DocumentType<Ticket>;
