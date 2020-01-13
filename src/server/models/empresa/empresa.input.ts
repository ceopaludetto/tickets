import { IsString, IsOptional, IsUrl, IsEmail, IsArray, ValidateNested, Matches } from 'class-validator';

import { AssociacaoInput } from '@/server/models/associacao';
import { UsuarioInputDTO } from '@/server/models/usuario';

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public usuarios?: (UsuarioInputDTO & { associacao: AssociacaoInput })[];
}
