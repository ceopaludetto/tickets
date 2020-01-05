import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

import { LoginInputDTO } from './auth.dto';

export class LoginInput implements LoginInputDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public senha!: string;
}
