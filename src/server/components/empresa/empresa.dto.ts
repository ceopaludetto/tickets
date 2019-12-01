import { IsString, IsOptional, Matches } from 'class-validator';

export class CreateOrUpdateEmpresaDto {
  @IsString()
  @IsOptional()
  public razaoSocial!: string;

  @IsString()
  @IsOptional()
  public cnpj!: string;

  @IsString()
  @IsOptional()
  @Matches(/(\d){5}-(\d){3}/)
  public cep!: string;

  @IsString()
  @IsOptional()
  @Matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/)
  public telefone!: string;
}
