import { Field, InputType } from 'type-graphql';
import { IsString, IsEmail, IsOptional, IsUUID } from 'class-validator';

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
  public Password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUUID()
  public Empresa?: string;
}

export interface LoginFuncionario {
  Email: string;
  Password: string;
}
