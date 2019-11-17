import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nest-modules/mailer';

import { UsuarioService } from '@/server/components/usuario/usuario.service';
import { UsuarioDoc, UsuarioInput } from '@/server/models';
import { ContextType, ID } from '@/server/utils/common.dto';

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

  public async profile(_id: ID) {
    const user = await this.userService.findOne({ _id });
    return user;
  }

  public async verify(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }

  public async login(email: string, senha: string) {
    const funcionario = await this.userService.login({
      email,
      senha,
    });

    return funcionario;
  }

  public async register(input: UsuarioInput) {
    const funcionario = await this.userService.createOrUpdate(input);

    if (funcionario) {
      await this.mailerService.sendMail({
        to: funcionario.email,
        subject: 'Conta criada com sucesso',
        template: 'register',
        context: {
          email: funcionario.email,
        },
      });
    }

    return funcionario;
  }

  public async forgot(email: string) {
    const funcionario = await this.userService.findOne({
      email,
    });

    if (funcionario) {
      await this.mailerService.sendMail({
        to: funcionario.email,
        subject: 'F3desk - Alteração de senha',
        template: 'forgot',
        context: {
          url: 'gerarurl',
        },
      });
    }

    return funcionario;
  }

  public async generateAndRegisterToken({ _id, email }: UsuarioDoc, { res }: ContextType) {
    const token = await this.jwtService.signAsync({
      _id,
      email,
    });

    res.cookie('auth', token, {
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    return token;
  }
}
