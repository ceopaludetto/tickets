/* eslint-disable no-underscore-dangle */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';

import { ContextType, PayloadType, Role, CustomMatcherOptions } from '@/server/utils/common.dto';
import { SECURITY_ROLE_DECORATOR, SECURITY_CUSTOM_MATCHER_DECORATOR } from '@/server/utils/constants';
import { UsuarioService } from '@/server/components/usuario/usuario.service';
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

  private getArgs = (ctx: GraphQLExecutionContext) => {
    const args = ctx.getArgs();
    return args;
  };

  public async canActivate(context: ExecutionContext) {
    const ctx = this.createContext(context); // Cria o contexto
    const req = this.getRequest(ctx); // Captura a requisição
    const empresa = this.getEmpresa(req); // Captura o header empresa
    const args = this.getArgs(ctx); // Captura os argumentos do resolver

    // Verifica se há usuario
    if (!req.user) {
      throw new AuthenticationError('Usuário inválido');
    }

    // Captura informações do usuário
    const usuario = await this.usuarioService.findOne((req.user as PayloadType)._id);

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
      const isSameUser = role.useUserID ? !!req.user._id : req.user._id === args._id;

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

    throw new AuthenticationError('UseRole or UseCustomMatcher not provided');
  }
}
