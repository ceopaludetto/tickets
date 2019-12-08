import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './auth.dto';
import { CreateOrUpdateUsuarioDto } from '@/server/components/Usuario';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() { email, senha }: LoginUsuarioDto, @Res() res: Response) {
    const usuario = await this.authService.login(email, senha);
    await this.authService.generateAndRegisterToken(usuario, res);
    return res.send(usuario);
  }

  @Post('/register')
  public async register(@Body() data: CreateOrUpdateUsuarioDto, @Res() res: Response) {
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
