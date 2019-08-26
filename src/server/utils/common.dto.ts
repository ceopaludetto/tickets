import { ArgsType, Field, Int, ID } from 'type-graphql';
import {
  IsInt,
  IsString,
  IsOptional,
  IsMongoId,
  IsDefined,
} from 'class-validator';
import { Request, Response } from 'express';
import { InstanceType } from 'typegoose';
import { Schema } from 'mongoose';

import {
  Usuario,
  RecursoEnum,
  AcaoEnum,
  AnyOrOwnEnum,
  Associacao,
} from '@/server/models';

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
  tipo: AnyOrOwnEnum;
  useUserID?: boolean;
  customMatcher?: (
    user: InstanceType<Usuario>,
    assoc: InstanceType<Associacao>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any
  ) => boolean;
}

export interface Args {
  empresa?: Schema.Types.ObjectId;
}

export interface Erro {
  status: number;
  message?: string;
  error?: string;
}

export interface ReactContextType {
  url?: string;
}
