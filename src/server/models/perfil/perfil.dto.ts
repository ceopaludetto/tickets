import { InputType, Field, ArgsType, registerEnumType } from 'type-graphql';
import {
  IsString,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsArray,
} from 'class-validator';

import { PoliticaInput } from '../politica/politica.dto';
import { CommonFindOneArgs } from '@/server/utils/common.dto';

export enum PerfilEnum {
  Suporte = 'SUPORTE',
  Analista = 'ANALISTA',
  Coordenador = 'COORDENADOR',
  Gerente = 'GERENTE',
  Diretor = 'DIRETOR',
  ConsultorExterno = 'CONSULTOR_EXTERNO',
  VIP = 'VIP',
}

registerEnumType(PerfilEnum, {
  name: 'PerfilEnum',
});

@InputType()
export class PerfilInput {
  @Field(() => PerfilEnum, { nullable: true })
  @IsOptional()
  @IsEnum(PerfilEnum)
  @IsNotEmpty()
  public nome?: PerfilEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public descricao?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public herda?: string;

  @Field({ nullable: true })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public empresa?: string;

  @Field(() => [PoliticaInput], { nullable: true })
  @IsOptional()
  @IsArray()
  public politicas?: PoliticaInput[];
}

@ArgsType()
export class PerfilUpdateArgs extends CommonFindOneArgs {
  @Field(() => PerfilInput)
  public input!: PerfilInput;
}
