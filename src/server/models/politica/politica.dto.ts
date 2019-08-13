import { registerEnumType, InputType, Field } from 'type-graphql';
import { IsOptional, IsEnum, IsBoolean } from 'class-validator';

export enum RecursoEnum {
  Perfil = 'PERFIL',
}

export enum AcaoEnum {
  Ler = 'LER',
  Criar = 'CRIAR',
  Atualizar = 'ATUALIZAR',
  Excluir = 'EXCLUIR',
}

registerEnumType(RecursoEnum, {
  name: 'RecursoEnum',
});

registerEnumType(AcaoEnum, {
  name: 'AcaoEnum',
});

@InputType()
export class PoliticaInput {
  @Field(() => RecursoEnum, { nullable: true })
  @IsOptional()
  @IsEnum(RecursoEnum)
  public recurso?: RecursoEnum;

  @Field(() => AcaoEnum, { nullable: true })
  @IsOptional()
  @IsEnum(AcaoEnum)
  public acao?: AcaoEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  public isDeny?: boolean;
}
