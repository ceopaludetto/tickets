import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

import { ContextType, PayloadType, Role } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR } from '@/server/utils/constants';
import { UsuarioService } from '@/server/modules/usuario/usuario.service';
import { SecurityMatcher } from './security.matcher';

@Injectable()
export class SecurityGuard implements CanActivate {
  private readonly usuarioService: UsuarioService;

  private readonly reflector: Reflector;

  private readonly securityMatcher = new SecurityMatcher();

  public constructor(usuarioService: UsuarioService, reflector: Reflector) {
    this.usuarioService = usuarioService;
    this.reflector = reflector;
  }

  private createContext = (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx;
  };

  private getRequest = (ctx: GraphQLExecutionContext) => {
    const { req } = ctx.getContext<ContextType>();
    return req;
  };

  private getEmpresa = (req: Request) => {
    const { empresa } = req;
    return empresa;
  };

  public async canActivate(context: ExecutionContext) {
    const ctx = this.createContext(context);
    const req = this.getRequest(ctx);
    const empresa = this.getEmpresa(req);

    if (!req.user) {
      throw new UnauthorizedException('Usuário inválido');
    }

    const usuario = await this.usuarioService.findOne(
      // eslint-disable-next-line no-underscore-dangle
      (req.user as PayloadType)._id
    );

    if (!usuario) {
      return false;
    }

    const role = this.reflector.get<Role>(
      SECURITY_ROLE_DECORATOR,
      context.getHandler()
    );

    const isValid = await this.securityMatcher.isValid({
      usuario,
      role,
      empresa,
    });

    return isValid;
  }
}
