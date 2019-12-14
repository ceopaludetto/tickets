import { IsString, IsOptional, IsHexColor } from 'class-validator';

import { IsShortID } from '@/server/utils/isShortid';

export interface LabelInputDTO {
  descricao?: string;
  cor?: string;
  ticketID?: string;
}

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
