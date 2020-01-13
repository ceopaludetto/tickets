import { IsString, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { StatusInputDTO } from './status.dto';

export class StatusInput implements StatusInputDTO {
  @IsString()
  @IsOptional()
  public nome?: string;

  @IsShortID()
  @IsString()
  @IsOptional()
  public empresaID?: string;
}
