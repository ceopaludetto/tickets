import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nest-modules/mailer';
import { Response } from 'express';

import { Usuario, UsuarioService, CreateOrUpdateUsuarioDto } from '@/server/components/Usuario';

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
    const user = await this.userService.findOne(id);
    return user;
  }

  public async verify(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }

  public async login(email: string, senha: string) {
    const usuario = await this.userService.login(email, senha);

    return usuario;
  }

  public async register(data: CreateOrUpdateUsuarioDto) {
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

  public async generateAndRegisterToken({ id, email }: Usuario, res: Response) {
    const token = await this.jwtService.signAsync({
      id,
      email,
    });

    res.cookie('auth', token, {
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    return token;
  }
}
