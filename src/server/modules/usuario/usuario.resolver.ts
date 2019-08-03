import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { InputUsuario } from './usuario.dto';
import { CommonFindAllArgs } from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/modules/auth/auth.guard';

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
  public async findUsuario(@Args('id') id: string) {
    const usuario = await this.userService.findOne(id);
    return usuario;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  public async profile(@Context() { req }: ContextType) {
    // eslint-disable-next-line no-underscore-dangle
    const usuario = await this.userService.findOne(req.user._id);
    return usuario;
  }

  @Mutation(() => Usuario)
  public async addUsuario(@Args('input') data: InputUsuario) {
    const usuario = this.userService.createOrUpdate(data);
    return usuario;
  }

  @Mutation(() => Usuario)
  public async updateUsuario(
    @Args('input')
    data: InputUsuario,
    @Args('id')
    id: string
  ) {
    const usuario = this.userService.createOrUpdate(data, id);
    return usuario;
  }
}
