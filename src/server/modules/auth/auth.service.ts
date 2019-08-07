import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsuarioService } from '@/server/modules/usuario/usuario.service';
import { Usuario } from '@/server/models';
import { ContextType } from '@/server/utils/common.dto';

@Injectable()
export class AuthService {
  private readonly userService: UsuarioService;

  private readonly jwtService: JwtService;

  public constructor(userService: UsuarioService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  public async login(email: string, senha: string) {
    try {
      const funcionario = await this.userService.login({
        email,
        senha,
      });

      return funcionario;
    } catch (err) {
      throw new Error(err);
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
