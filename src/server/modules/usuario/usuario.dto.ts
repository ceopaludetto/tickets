import { Field, InputType, ArgsType } from 'type-graphql';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsMongoId,
  IsEnum,
} from 'class-validator';

import { Permissao } from '@/server/modules/auth/auth.roles';

@InputType()
export class InputUsuario {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public sobrenome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  public email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public cargo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public senha?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsMongoId()
  public empresa?: string;

  @Field(() => Permissao, { nullable: true })
  @IsOptional()
  @IsEnum(Permissao)
  public permissao?: Permissao;
}

@ArgsType()
export class LoginUsuario {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public senha!: string;
}
