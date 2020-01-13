import { MailerService } from '@nest-modules/mailer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UsuarioService } from '@/server/components/usuario';
import { Usuario, UsuarioInput } from '@/server/models/usuario';

@Injectable()
export class AuthService {
  private readonly userService: UsuarioService;

  private readonly jwtService: JwtService;

  private readonly mailerService: MailerService;

  public constructor(userService: UsuarioService, jwtService: JwtService, mailerService: MailerService) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.mailerService = mailerService;
  }

  public async profile(id: string) {
    return this.userService.findOne(id);
  }

  public async verify(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  public async login(email: string, senha: string) {
    return this.userService.login(email, senha);
  }

  public async register(data: UsuarioInput) {
    const usuario = await this.userService.createOrUpdate(data);

    if (usuario) {
      await this.mailerService.sendMail({
        to: usuario.email,
        subject: 'Conta criada com sucesso',
        template: 'register',
        context: {
          email: usuario.email,
        },
      });
    }

    return usuario;
  }

  // public async forgot(email: string) {
  //   const funcionario = await this.userService.findOne({
  //     email,
  //   });

  //   if (funcionario) {
  //     await this.mailerService.sendMail({
  //       to: funcionario.email,
  //       subject: 'F3desk - Alteração de senha',
  //       template: 'forgot',
  //       context: {
  //         url: 'gerarurl',
  //       },
  //     });
  //   }

  //   return funcionario;
  // }

  public async generateAndRegisterToken({ id }: Usuario, res: Response) {
    const token = await this.jwtService.signAsync({
      id,
    });

    res.cookie('AUTH', token, {
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    return token;
  }
}
