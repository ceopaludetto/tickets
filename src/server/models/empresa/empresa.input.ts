import { IsString, IsOptional, Matches } from 'class-validator';

import { EmpresaInputDTO } from './empresa.dto';

export class EmpresaInput implements EmpresaInputDTO {
  @IsString()
  @IsOptional()
  public razaoSocial?: string;

  @IsString()
  @IsOptional()
  public cnpj?: string;

  @IsString()
  @IsOptional()
  @Matches(/(\d){5}-(\d){3}/)
  public cep?: string;

  @IsString()
  @IsOptional()
  @Matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/)
  public telefone?: string;
}
