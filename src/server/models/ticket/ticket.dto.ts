import {
  IsMongoId,
  IsOptional,
  IsEnum,
  IsArray,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { registerEnumType, InputType, Field, ID, ArgsType } from 'type-graphql';
import { Schema } from 'mongoose';

import { LabelInput } from '../label/label.dto';
import { CommonFindOneArgs } from '@/server/utils/common.dto';

export enum TicketStatusEnum {
  Completo = 'COMPLETO',
  Pendente = 'PENDENTE',
  Verificacao = 'VERIFICACAO',
}

registerEnumType(TicketStatusEnum, {
  name: 'TicketStatusEnum',
});

@InputType()
export class TicketInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public descricao?: string;

  @Field(() => ID, { nullable: true })
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  public usuario?: Schema.Types.ObjectId;

  @Field(() => TicketStatusEnum, { nullable: true })
  @IsOptional()
  @IsEnum(TicketStatusEnum)
  @IsNotEmpty()
  public status?: TicketStatusEnum;

  @Field(() => [LabelInput], { nullable: true })
  @IsOptional()
  @IsArray()
  public labels?: LabelInput[];
}

@ArgsType()
export class TicketUpdateArgs extends CommonFindOneArgs {
  @Field(() => TicketInput)
  public input!: TicketInput;
}
