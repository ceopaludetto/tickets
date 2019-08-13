import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UsuarioService } from './usuario.service';
import {
  Usuario,
  UsuarioInput,
  UsuarioUpdateArgs,
  AcaoEnum,
  AnyOrOwnEnum,
  RecursoEnum,
} from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
} from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/components/auth/auth.guard';
import { SecurityGuard } from '@/server/components/security/security.guard';
import { UseRole } from '@/server/components/security/security.decorators';

interface ContextType {
  req: Request;
  res: Response;
}

@Resolver(() => Usuario)
export class UsuarioResolver {
  private readonly userService: UsuarioService;

  public constructor(userService: UsuarioService) {
    this.userService = userService;
  }

  @Query(() => [Usuario])
  public async findAllUsuarios(@Args() { skip, take }: CommonFindAllArgs) {
    const usuarios = await this.userService.findAll(skip, take);
    return usuarios;
  }

  @Query(() => Usuario)
  public async findUsuario(@Args() { _id }: CommonFindOneArgs) {
    const usuario = await this.userService.findOne(_id);
    return usuario;
  }

  @UseGuards(GqlAuthGuard, SecurityGuard)
  @UseRole({
    acao: AcaoEnum.Ler,
    recurso: RecursoEnum.Perfil,
    type: AnyOrOwnEnum.Own,
  })
  @Query(() => Usuario)
  public async profile(@Context() { req }: ContextType) {
    // eslint-disable-next-line no-underscore-dangle
    const usuario = await this.userService.findOne(req.user._id);
    return usuario;
  }

  @Mutation(() => Usuario)
  public async addUsuario(@Args('input') input: UsuarioInput) {
    const usuario = this.userService.createOrUpdate(input);
    return usuario;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Usuario)
  public async updateUsuario(@Args() { input, _id }: UsuarioUpdateArgs) {
    const usuario = this.userService.createOrUpdate(input, _id);
    return usuario;
  }
}
