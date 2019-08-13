import { registerEnumType, InputType, Field } from 'type-graphql';
import { IsOptional, IsEnum, IsBoolean, IsString } from 'class-validator';

export enum RecursoEnum {
  Perfil = 'PERFIL',
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
  @IsEnum(RecursoEnum)
  public recurso?: RecursoEnum;

  @Field(() => AcaoEnum, { nullable: true })
  @IsOptional()
  @IsString()
  @IsEnum(AcaoEnum)
  public acao?: AcaoEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  public deny?: boolean;

  @Field(() => AnyOrOwnEnum, { nullable: true })
  @IsOptional()
  @IsString()
  @IsEnum(AnyOrOwnEnum)
  public type?: AnyOrOwnEnum;
}
