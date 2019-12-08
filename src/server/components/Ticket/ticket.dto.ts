import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

import { CreateOrUpdateLabelDto } from '@/server/components/Label';

export class CreateOrUpdateTicketDto {
  @IsString()
  @IsOptional()
  public nome!: string;

  @IsString()
  @IsOptional()
  public descricao!: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public label!: CreateOrUpdateLabelDto[];
}
