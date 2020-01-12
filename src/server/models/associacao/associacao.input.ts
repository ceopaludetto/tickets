import { IsString, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { AssociacaoInputDTO } from './associacao.dto';

export class AssociacaoInput implements AssociacaoInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public empresaID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public usuarioID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public perfilID?: string;
}
