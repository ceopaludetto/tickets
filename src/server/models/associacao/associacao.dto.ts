import { Field, InputType, registerEnumType } from 'type-graphql';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Ref } from 'typegoose';

import { Empresa } from '../empresa/empresa.entity';
import { Perfil } from '../perfil/perfil.entity';

export enum AssociacaoEnum {
  Funcionario = 'FUNCIONARIO',
  Independente = 'INDEPENDENTE',
  Dono = 'DONO',
}

registerEnumType(AssociacaoEnum, {
  name: 'AssociacaoEnum',
});

@InputType()
export class AssociacaoInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public empresa?: Ref<Empresa>;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public perfil?: Ref<Perfil>;

  @Field(() => AssociacaoEnum, { nullable: true })
  @IsOptional()
  @IsEnum(AssociacaoEnum)
  public tipo?: string;
}
