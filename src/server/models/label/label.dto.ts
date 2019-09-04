import { IsString, IsHexColor, IsOptional, IsNotEmpty } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class LabelInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public descricao?: string;

  @Field({ nullable: true })
  @IsString()
  @IsHexColor()
  @IsOptional()
  @IsNotEmpty()
  public cor?: string;
}
