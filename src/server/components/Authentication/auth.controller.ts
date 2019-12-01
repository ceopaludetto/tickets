import { Controller, Post, Body, Response } from '@nestjs/common';
import { Response as Res } from 'express';

import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './auth.dto';
import { CreateOrUpdateUsuarioDto } from '@/server/components/Usuario';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() { email, senha }: LoginUsuarioDto, @Response() res: Res) {
    const usuario = await this.authService.login(email, senha);
    await this.authService.generateAndRegisterToken(usuario, res);
    return usuario;
  }

  @Post('/register')
  public async register(@Body() data: CreateOrUpdateUsuarioDto, @Response() res: Res) {
    const usuario = await this.authService.register(data);
    await this.authService.generateAndRegisterToken(usuario, res);
    return usuario;
  }
}
