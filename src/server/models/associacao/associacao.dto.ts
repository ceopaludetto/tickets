import { Field, InputType, registerEnumType } from 'type-graphql';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
  IsEnum,
} from 'class-validator';

export enum AssociacaoEnum {
  Funcionario = 'FUNCIONARIO',
  Independente = 'INDEPENDENTE',
}

registerEnumType(AssociacaoEnum, {
  name: 'AssociacaoEnum',
});

@InputType()
export class AssociacaoInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public empresa?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public perfil?: string;

  @Field(() => AssociacaoEnum, { nullable: true })
  @IsOptional()
  @IsEnum(AssociacaoEnum)
  public tipo?: AssociacaoEnum;
}
