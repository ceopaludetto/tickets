import { Field, InputType, ArgsType } from 'type-graphql';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';

@InputType()
export class InputFuncionario {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Nome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Sobrenome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  public Email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Cargo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Senha?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUUID()
  public Empresa_ID?: string;
}

@ArgsType()
export class LoginFuncionario {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public Email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public Senha!: string;
}

export interface ILoginFuncionario {
  Email: string;
  Senha: string;
}
