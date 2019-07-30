import { Field, InputType } from 'type-graphql';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';

import { EnumDiaPagamento, EnumPlanoHoras } from './empresa.entity';

@InputType()
export class InputEmpresaInsertOrUpdate {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(16, 20)
  public CNPJ?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Razao_Social?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Nome_Fantasia?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Endereco?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public CEP?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Telefone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  public Site?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public Nome_Completo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  public Email?: string;

  @Field(() => EnumDiaPagamento, { nullable: true })
  @IsOptional()
  @IsEnum(EnumDiaPagamento)
  public Dia_Pagamento?: EnumDiaPagamento;

  @Field(() => EnumPlanoHoras, { nullable: true })
  @IsOptional()
  @IsEnum(EnumPlanoHoras)
  public Plano_De_Horas?: EnumPlanoHoras;
}
