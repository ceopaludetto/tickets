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
