import { Field, InputType, ArgsType } from 'type-graphql';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsArray,
  IsDate,
  Matches,
  ValidateNested,
} from 'class-validator';

import { CommonFindOneArgs } from '@/server/utils/common.dto';
import { AssociacaoInput } from '../associacao/associacao.dto';

@InputType()
export class UsuarioInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public sobrenome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public cargo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public senha?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/\([0-9]{2}\) 9?[1-9]{4}-[1-9]{4}/g)
  public telefone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  public nascimento?: Date;

  @Field(() => [AssociacaoInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  public associacoes?: AssociacaoInput[];
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

@ArgsType()
export class UsuarioUpdateArgs extends CommonFindOneArgs {
  @Field(() => UsuarioInput)
  public input!: UsuarioInput;
}
