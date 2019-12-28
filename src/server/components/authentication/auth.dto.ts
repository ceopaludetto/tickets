import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export interface LoginInputDTO {
  email?: string;
  senha?: string;
}

export class LoginInput implements LoginInputDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public senha!: string;
}
