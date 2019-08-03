import { Field, InputType, ArgsType } from 'type-graphql';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsMongoId,
} from 'class-validator';

@InputType()
export class InputFuncionario {
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
}

@ArgsType()
export class LoginFuncionario {
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
