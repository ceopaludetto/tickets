/* eslint-disable no-underscore-dangle */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UsuarioService } from '@/server/components/usuario';
import { Role, CustomMatcherOptions } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR, SECURITY_CUSTOM_MATCHER_DECORATOR } from '@/server/utils/constants';

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

  private getRequest = (ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req;
  };

  private getEmpresa = (req: Request) => {
    const { empresa } = req;
    return empresa;
  };

  private getArgs = (ctx: ExecutionContext) => {
    const args = ctx.getArgs();
    return args;
  };

  public async canActivate(context: ExecutionContext) {
    const req: Request = this.getRequest(context); // Captura a requisição
    const empresa: string = this.getEmpresa(req); // Captura o header empresa
    const args: any = this.getArgs(context); // Captura os argumentos do resolver

    // Verifica se há usuario
    if (!req.user) {
      throw new UnauthorizedException('Usuário inválido');
    }

    // Captura informações do usuário
    const usuario = await this.usuarioService.findOne(req.user.id);

    // Verifica se as informações foram capturadas
    if (!usuario) {
      return false;
    }

    // Captura a role injetada com o decorator
    const role = this.reflector.get<Role>(SECURITY_ROLE_DECORATOR, context.getHandler());

    const customMatcher = this.reflector.get<CustomMatcherOptions>(
      SECURITY_CUSTOM_MATCHER_DECORATOR,
      context.getHandler()
    );

    if (role) {
      // Verifica se o usuário logado tenta alterar suas próprias informações, se a opção useUserID esta marcada, sera usado o ID do usuario logado
      // Caso contrario, sera usado o _id do argumento
      const isSameUser = role.useUserID ? !!req.user.id : req.user.id === args.id;

      // Chama o validador
      const isValid = await this.securityMatcher.isRoleValid({
        usuario,
        role,
        empresa,
        args,
        isSameUser,
      });

      return isValid;
    }

    if (customMatcher) {
      return this.securityMatcher.isCustomMatcherValid({
        usuario,
        args,
        customMatcher,
      });
    }

    throw new UnauthorizedException('UseRole or UseCustomMatcher not provided');
  }
}
