import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsuarioService } from './usuario.service';
import { Usuario, UsuarioUpdateArgs } from '@/server/models';
import { CommonFindAllArgs, CommonFindOneArgs } from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/components/auth/auth.guard';
import { SecurityGuard } from '@/server/components/security/security.guard';
import { UseCustomMatcher } from '@/server/components/security/security.decorators';

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
    const usuario = await this.userService.findOne({ _id });
    return usuario;
  }

  @UseCustomMatcher({
    customMatcher: (usuario, args: UsuarioUpdateArgs) => usuario._id.equals(args._id),
    errorText: 'Proibida alteração de diferentes usuários',
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Usuario)
  public async updateUsuario(@Args() { input, _id }: UsuarioUpdateArgs) {
    const usuario = await this.userService.createOrUpdate(input, _id);
    return usuario;
  }
}
