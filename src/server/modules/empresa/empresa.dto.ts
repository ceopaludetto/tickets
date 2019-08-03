import { Field, InputType, registerEnumType } from 'type-graphql';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsUrl,
  Length,
  IsOptional,
  Matches,
} from 'class-validator';

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
  name: 'DiaDePagamento',
});

registerEnumType(EnumPlanoHoras, {
  name: 'PlanoDeHoras',
});

@InputType()
export class InputEmpresa {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/)
  @Length(16, 20)
  public cnpj?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public razaoSocial?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public nomeFantasia?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public endereco?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public cep?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public telefone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  public site?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public nomeCompleto?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  public email?: string;

  @Field(() => EnumDiaPagamento, { nullable: true })
  @IsOptional()
  @IsEnum(EnumDiaPagamento)
  public diaPagamento?: EnumDiaPagamento;

  @Field(() => EnumPlanoHoras, { nullable: true })
  @IsOptional()
  @IsEnum(EnumPlanoHoras)
  public planoHoras?: EnumPlanoHoras;
}
