import { ArgsType, Field, Int } from 'type-graphql';
import { IsInt, IsString, IsUUID, IsOptional } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

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
  @IsUUID()
  public id!: string;
}

export interface ContextType {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface PayloadType {
  ID: string;
  Email: string;
}
