import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsuarioService } from './usuario.service';
import {
  Usuario,
  UsuarioUpdateArgs,
  AcaoEnum,
  AnyOrOwnEnum,
  RecursoEnum,
} from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
  PayloadType,
} from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/components/auth/auth.guard';
import { SecurityGuard } from '@/server/components/security/security.guard';
import { UseRole } from '@/server/components/security/security.decorators';
import { User } from '@/server/components/auth/auth.decorator';

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

  @UseGuards(GqlAuthGuard)
  @Query(() => Usuario)
  public async profile(@User() user: PayloadType) {
    // eslint-disable-next-line no-underscore-dangle
    const usuario = await this.userService.findOne(user._id);
    return usuario;
  }

  @UseRole({
    recurso: RecursoEnum.Usuario,
    acao: AcaoEnum.Atualizar,
    tipo: AnyOrOwnEnum.Own,
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Usuario)
  public async updateUsuario(@Args() { input, _id }: UsuarioUpdateArgs) {
    const usuario = this.userService.createOrUpdate(input, _id);
    return usuario;
  }
}
