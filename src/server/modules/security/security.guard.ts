import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ContextType, PayloadType, Role } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR } from '@/server/utils/constants';
import { UsuarioService } from '@/server/modules/usuario/usuario.service';

@Injectable()
export class SecurityGuard implements CanActivate {
  private readonly usuarioService: UsuarioService;

  private readonly reflector: Reflector;

  public constructor(usuarioService: UsuarioService, reflector: Reflector) {
    this.usuarioService = usuarioService;
    this.reflector = reflector;
  }

  private getRequest = (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<ContextType>();
    return req;
  };

  public async canActivate(context: ExecutionContext) {
    const role = this.reflector.get<Role>(
      SECURITY_ROLE_DECORATOR,
      context.getHandler()
    );

    const req = this.getRequest(context);
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

    if (usuario.sysAdmin) {
      return true;
    }

    return usuario.compareRole(role);
  }
}
