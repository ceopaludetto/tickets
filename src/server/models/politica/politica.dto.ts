import { registerEnumType, InputType, Field } from 'type-graphql';
import {
  IsOptional,
  IsEnum,
  IsBoolean,
  IsString,
  IsNotEmpty,
  ArrayUnique,
} from 'class-validator';

export enum RecursoEnum {
  Usuario = 'USUARIO', // Manipular informações sobre o modulo usuario
  Empresa = 'EMPRESA', // Manipular informações sobre o modulo empresa
  Perfil = 'PERFIL', // Manipular informações sobre o modulo perfil
}

export enum AcaoEnum {
  Ler = 'LER',
  Criar = 'CRIAR',
  Atualizar = 'ATUALIZAR',
  Excluir = 'EXCLUIR',
}

export enum AnyOrOwnEnum {
  Any = 'ANY',
  Own = 'OWN',
}

registerEnumType(RecursoEnum, {
  name: 'RecursoEnum',
});

registerEnumType(AcaoEnum, {
  name: 'AcaoEnum',
});

registerEnumType(AnyOrOwnEnum, {
  name: 'AnyOrOwnEnum',
});

@InputType()
export class PoliticaInput {
  @Field(() => RecursoEnum, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(RecursoEnum)
  public recurso?: RecursoEnum;

  @Field(() => [AcaoEnum], { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(AcaoEnum, { each: true })
  @ArrayUnique()
  public acao?: AcaoEnum[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  public negacao?: boolean;

  @Field(() => AnyOrOwnEnum, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(AnyOrOwnEnum)
  public tipo?: AnyOrOwnEnum;
}
