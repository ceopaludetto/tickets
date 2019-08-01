import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Funcionario } from '@/server/modules/funcionario/funcionario.entity';

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
    @Args('Email') Email: string,
    @Args('Password') Password: string,
    @Context() context: ContextType
  ) {
    const funcionario = await this.authService.login(Email, Password);
    if (funcionario) {
      await this.authService.generateAndRegisterToken(funcionario, context);
    }
    return funcionario;
  }
}
