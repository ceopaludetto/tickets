import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsuarioService } from '@/server/components/usuario/usuario.service';
import { Usuario, UsuarioInput } from '@/server/models';
import { ContextType, ID } from '@/server/utils/common.dto';

@Injectable()
export class AuthService {
  private readonly userService: UsuarioService;

  private readonly jwtService: JwtService;

  public constructor(userService: UsuarioService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  public async profile(_id: ID) {
    const user = await this.userService.findOne(_id);
    return user;
  }

  public async verify(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }

  public async login(email: string, senha: string) {
    try {
      const funcionario = await this.userService.login({
        email,
        senha,
      });

      return funcionario;
    } catch (err) {
      throw new BadRequestException('Erro ao logar');
    }
  }

  public async register(input: UsuarioInput) {
    try {
      const funcionario = await this.userService.createOrUpdate(input);

      return funcionario;
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar novo usuário');
    }
  }

  public async generateAndRegisterToken(
    { _id, email }: Usuario,
    { res }: ContextType
  ) {
    try {
      const token = await this.jwtService.signAsync({
        _id,
        email,
      });

      res.cookie('auth', token, {
        maxAge: 1000 * 60 * 60,
        path: '/',
      });

      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
}
