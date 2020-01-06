import { IsString, IsOptional, IsHexColor } from 'class-validator';

import { IsShortID } from '@/server/utils/isShortid';

import { LabelInputDTO } from './label.dto';

export class LabelInput implements LabelInputDTO {
  @IsString()
  @IsOptional()
  public descricao?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  public cor?: string;

  @IsShortID()
  @IsString()
  @IsOptional()
  public ticketID?: string;
}
