import { Field, InputType } from 'type-graphql';
import { IsString, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class InputFuncionarioInsertOrUpdate {
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
}

export interface LoginFuncionario {
  Email: string;
  Password: string;
}
