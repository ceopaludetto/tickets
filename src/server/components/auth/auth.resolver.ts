import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './auth.guard';
import { Usuario, LoginUsuario, UsuarioInput, UsuarioDoc, ForgotUsuario } from '@/server/models';
import { User } from '@/server/components/auth/auth.decorator';
// import { PayloadType } from '@/server/utils/common.dto';

type PayloadType = Pick<UsuarioDoc, '_id' | 'email'>;
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

  @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  public async profile(@User() user: PayloadType) {
    const usuario = await this.authService.profile(user._id);
    return usuario;
  }

  @Mutation(() => Usuario)
  public async login(@Args() { email, senha }: LoginUsuario, @Context() context: ContextType) {
    const usuario = await this.authService.login(email, senha);
    if (usuario) {
      await this.authService.generateAndRegisterToken(usuario, context);
    }
    return usuario;
  }

  @Mutation(() => Usuario)
  public async register(@Args('input') input: UsuarioInput, @Context() context: ContextType) {
    const usuario = await this.authService.register(input);
    if (usuario) {
      await this.authService.generateAndRegisterToken(usuario, context);
    }
    return usuario;
  }

  @Mutation(() => Usuario)
  public async forgot(@Args() { email }: ForgotUsuario) {
    const usuario = await this.authService.forgot(email);
    return usuario;
  }
}
