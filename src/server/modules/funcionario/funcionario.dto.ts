import { Field, InputType } from 'type-graphql';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

import { EnumPerfis } from './funcionario.entity';
import { Empresa } from '@/server/modules/empresa/empresa.entity';

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

  @Field(() => EnumPerfis, { nullable: true })
  @IsOptional()
  @IsEnum(EnumPerfis)
  public Perfil?: EnumPerfis;

  @Field(() => Empresa, { nullable: true })
  @IsOptional()
  public Empresa?: Empresa;
}

export interface LoginFuncionario {
  Email: string;
  Password: string;
}
