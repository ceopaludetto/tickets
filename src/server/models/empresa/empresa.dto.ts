import { Field, InputType, registerEnumType, ArgsType } from 'type-graphql';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  Length,
  IsOptional,
  Matches,
} from 'class-validator';

import { CommonFindOneArgs } from '@/server/utils/common.dto';

export enum EnumDiaPagamento {
  D7 = '7',
  D10 = '10',
  D15 = '15',
  D20 = '20',
}

export enum EnumPlanoHoras {
  H20 = '20',
  H40 = '40',
  H60 = '60',
  H80 = '80',
}

registerEnumType(EnumDiaPagamento, {
  name: 'DiaDePagamentoEnum',
});

registerEnumType(EnumPlanoHoras, {
  name: 'PlanoDeHorasEnum',
});

@InputType()
export class EmpresaInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/)
  @Length(16, 20)
  @IsNotEmpty()
  public cnpj?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public razaoSocial?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nomeFantasia?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public endereco?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public cep?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/\(\d{2}\) \d{4}-\d{4}/)
  public telefone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  public site?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nomeCompleto?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @Field(() => EnumDiaPagamento, { nullable: true })
  @IsOptional()
  @IsEnum(EnumDiaPagamento)
  @IsNotEmpty()
  public diaPagamento?: EnumDiaPagamento;

  @Field(() => EnumPlanoHoras, { nullable: true })
  @IsOptional()
  @IsEnum(EnumPlanoHoras)
  @IsNotEmpty()
  public planoHoras?: EnumPlanoHoras;
}

@ArgsType()
export class EmpresaArgs extends CommonFindOneArgs {
  @Field(() => EmpresaInput)
  public input!: EmpresaInput;
}
