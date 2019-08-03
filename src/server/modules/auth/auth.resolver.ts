import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Funcionario } from '@/server/modules/funcionario/funcionario.entity';
import { LoginFuncionario } from '@/server/modules/funcionario/funcionario.dto';

interface ContextType {
  req: Request;
  res: Response;
}

@Resolver()
export class AuthResolver {
  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Mutation(() => Funcionario)
  public async login(
    @Args() { Email, Senha }: LoginFuncionario,
    @Context() context: ContextType
  ) {
    const funcionario = await this.authService.login(Email, Senha);
    if (funcionario) {
      await this.authService.generateAndRegisterToken(funcionario, context);
    }
    return funcionario;
  }
}
