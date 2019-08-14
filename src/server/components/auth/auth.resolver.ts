import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { Usuario, LoginUsuario, UsuarioInput } from '@/server/models';

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
    const usuario = await this.authService.login(email, senha);
    if (usuario) {
      await this.authService.generateAndRegisterToken(usuario, context);
    }
    return usuario;
  }

  @Mutation(() => Usuario)
  public async register(
    @Args('input') input: UsuarioInput,
    @Context() context: ContextType
  ) {
    const usuario = await this.authService.register(input);
    if (usuario) {
      await this.authService.generateAndRegisterToken(usuario, context);
    }
    return usuario;
  }
}
