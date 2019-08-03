import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { FuncionarioService } from '@/server/modules/funcionario/funcionario.service';
import { Funcionario } from '@/server/modules/funcionario/funcionario.entity';
import { ContextType } from '@/server/utils/common.dto';

@Injectable()
export class AuthService {
  private readonly funcionarioService: FuncionarioService;

  private readonly jwtService: JwtService;

  public constructor(
    funcionarioService: FuncionarioService,
    jwtService: JwtService
  ) {
    this.funcionarioService = funcionarioService;
    this.jwtService = jwtService;
  }

  public async login(email: string, senha: string) {
    try {
      const funcionario = await this.funcionarioService.login({
        email,
        senha,
      });

      return funcionario;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async generateAndRegisterToken(
    { _id, email }: Funcionario,
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
