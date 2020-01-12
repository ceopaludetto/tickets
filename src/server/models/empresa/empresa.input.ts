import { IsString, IsOptional, IsUrl, IsEmail, Matches } from 'class-validator';

import { EmpresaInputDTO } from './empresa.dto';

export class EmpresaInput implements EmpresaInputDTO {
  @IsString()
  @IsOptional()
  public cnpj?: string;

  @IsString()
  @IsOptional()
  public razaoSocial?: string;

  @IsString()
  @IsOptional()
  public nomeFantasia?: string;

  @IsString()
  @IsOptional()
  public nomeCompleto?: string;

  @IsString()
  @IsOptional()
  @Matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/)
  public telefone?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  public site?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsString()
  @IsOptional()
  @Matches(/(\d){5}-(\d){3}/)
  public cep?: string;

  @IsString()
  @IsOptional()
  public endereco?: string;
}
