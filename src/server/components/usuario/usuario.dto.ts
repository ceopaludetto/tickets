import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';

export class CreateOrUpdateUsuarioDto {
  @IsString()
  @IsOptional()
  public nome?: string;

  @IsString()
  @IsOptional()
  public sobrenome?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public senha?: string;

  @IsString()
  @IsOptional()
  @Matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/)
  public telefone?: string;

  @IsOptional()
  public dataNascimento?: Date;
}
