import { ArgsType, Field, Int, ID } from 'type-graphql';
import {
  IsInt,
  IsString,
  IsOptional,
  IsMongoId,
  IsDefined,
} from 'class-validator';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';

import { Usuario, RecursoEnum, AcaoEnum, AnyOrOwnEnum } from '@/server/models';

@ArgsType()
export class CommonFindAllArgs {
  @Field(() => Int)
  @IsInt()
  @IsOptional()
  public skip?: number = 0;

  @Field(() => Int)
  @IsInt()
  @IsOptional()
  public take?: number = 100;
}

@ArgsType()
export class CommonFindOneArgs {
  @Field(() => ID)
  @IsString()
  @IsMongoId()
  @IsDefined()
  public _id!: Schema.Types.ObjectId;
}

export interface ContextType {
  req: Request;
  res: Response;
}

export type ID = Schema.Types.ObjectId;

export type PayloadType = Pick<Usuario, '_id' | 'email'>;

export interface Role {
  recurso: RecursoEnum;
  acao: AcaoEnum;
  type: AnyOrOwnEnum;
}

export interface Args {
  empresa?: Schema.Types.ObjectId;
}

export interface Erro {
  status: number;
  message?: string;
  error?: string;
}
