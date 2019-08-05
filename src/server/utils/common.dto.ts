import { ArgsType, Field, Int } from 'type-graphql';
import { IsInt, IsString, IsOptional, IsMongoId } from 'class-validator';
import { Request, Response } from 'express';

import { Permissao } from '@/server/modules/auth/auth.roles';

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
  @Field()
  @IsString()
  @IsMongoId()
  public _id!: string;
}

export interface ContextType {
  req: Request;
  res: Response;
}

export interface PayloadType {
  _id: string;
  email: string;
  permissao: Permissao;
}
