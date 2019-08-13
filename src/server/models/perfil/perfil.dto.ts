import { InputType, Field, ArgsType } from 'type-graphql';
import {
  IsString,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsArray,
} from 'class-validator';

import { PoliticaInput } from '../politica/politica.dto';
import { CommonFindOneArgs } from '@/server/utils/common.dto';

@InputType()
export class PerfilInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public nome?: string;

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
