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

  public async login(Email: string, Password: string) {
    try {
      const funcionario = await this.funcionarioService.login({
        Email,
        Password,
      });

      return funcionario;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async generateAndRegisterToken(
    funcionario: Funcionario,
    context: ContextType
  ) {
    try {
      const token = await this.jwtService.signAsync({
        ID: funcionario.ID,
        Email: funcionario.Email,
      });

      context.res.cookie('auth', token, {
        maxAge: 1000 * 60 * 60,
        path: '/',
      });

      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
}
