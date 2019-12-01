import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public senha!: string;
}
