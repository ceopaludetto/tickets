import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Usuario, LoginUsuario } from '@/server/models';

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

  @Mutation(() => Usuario)
  public async login(
    @Args() { email, senha }: LoginUsuario,
    @Context() context: ContextType
  ) {
    const funcionario = await this.authService.login(email, senha);
    if (funcionario) {
      await this.authService.generateAndRegisterToken(funcionario, context);
    }
    return funcionario;
  }
}
