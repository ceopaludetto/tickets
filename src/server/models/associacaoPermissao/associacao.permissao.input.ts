import { IsString, IsOptional } from 'class-validator';

import { IsShortID } from '@/server/utils/validations/isShortid';

import { AssociacaoPermissaoInputDTO } from './associacao.permissao.dto';

export class AssociacaoPermissaoInput implements AssociacaoPermissaoInputDTO {
  @IsString()
  @IsOptional()
  @IsShortID()
  public associacaoID?: string;

  @IsString()
  @IsOptional()
  @IsShortID()
  public permissaoID?: string;
}
