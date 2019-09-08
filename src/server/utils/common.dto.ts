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
  UsuarioInstance,
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

export type PayloadType = Pick<UsuarioInstance, '_id' | 'email'>;

export interface Role {
  recurso: RecursoEnum;
  acao: AcaoEnum;
  tipo: AnyOrOwnEnum;
  useUserID?: boolean;
  customMatcher?: (
    user: UsuarioInstance,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any,
    assoc: InstanceType<Associacao>
  ) => boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomMatcher = (user: UsuarioInstance, args: any) => boolean;
export interface CustomMatcherOptions {
  customMatcher: CustomMatcher;
  errorText?: string;
}

export interface Args {
  empresa?: Schema.Types.ObjectId;
}

export interface ReactContextType {
  url?: string;
}
