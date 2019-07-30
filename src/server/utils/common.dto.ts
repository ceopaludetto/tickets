import { ArgsType, Field, Int } from 'type-graphql';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { Request, Response } from 'express';

@ArgsType()
export class CommonFindAllArgs {
  @Field(() => Int)
  @IsInt()
  public skip?: number = 0;

  @Field(() => Int)
  @IsInt()
  public take?: number = 100;
}

@ArgsType()
export class CommonFindOneArgs {
  @Field()
  @IsString()
  @IsUUID()
  public id: string;
}

export interface ContextType {
  req: Request;
  res: Response;
}

export interface PayloadType {
  ID: string;
  Email: string;
}
