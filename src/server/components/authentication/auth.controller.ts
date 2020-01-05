import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { LoginInput } from './auth.input';
import { AuthService } from './auth.service';
import { UsuarioInput } from '@/server/models/usuario';

@Controller('/api/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() { email, senha }: LoginInput, @Res() res: Response) {
    const usuario = await this.authService.login(email, senha);
    await this.authService.generateAndRegisterToken(usuario, res);
    return res.send(usuario);
  }

  @Post('/register')
  public async register(@Body() data: UsuarioInput, @Res() res: Response) {
    const usuario = await this.authService.register(data);
    await this.authService.generateAndRegisterToken(usuario, res);
    return res.send(usuario);
  }

  @UseGuards(AuthGuard())
  @Get('/profile')
  public async profile(@Req() request: Request) {
    return this.authService.profile(request.user.id);
  }
}
