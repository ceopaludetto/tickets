import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {
  Perfil,
  PerfilInput,
  PerfilUpdateArgs,
  AcaoEnum,
  RecursoEnum,
  AnyOrOwnEnum,
} from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
} from '@/server/utils/common.dto';
import { SecurityService } from './security.service';
import { SecurityGuard } from './security.guard';
import { UseRole } from './security.decorators';
import { GqlAuthGuard } from '@/server/components/auth/auth.guard';

@Resolver(() => Perfil)
export class SecurityResolver {
  private readonly securityService: SecurityService;

  public constructor(securityService: SecurityService) {
    this.securityService = securityService;
  }

  @Query(() => [Perfil])
  public async findAllPerfis(@Args() { skip, take }: CommonFindAllArgs) {
    const perfis = await this.securityService.findAll(skip, take);
    return perfis;
  }

  @UseRole({
    acao: AcaoEnum.Ler,
    recurso: RecursoEnum.Perfil,
    type: AnyOrOwnEnum.Own,
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Query(() => Perfil)
  public async findPerfil(@Args() { _id }: CommonFindOneArgs) {
    const perfil = await this.securityService.findOne(_id);
    return perfil;
  }

  @UseRole({
    acao: AcaoEnum.Criar,
    recurso: RecursoEnum.Perfil,
    type: AnyOrOwnEnum.Any,
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Perfil)
  public async addPerfil(@Args('input') input: PerfilInput) {
    const perfil = await this.securityService.addOrUpdate(input);
    return perfil;
  }

  @UseRole({
    acao: AcaoEnum.Atualizar,
    recurso: RecursoEnum.Perfil,
    type: AnyOrOwnEnum.Any,
    customMatcher: (user, assoc, args) => assoc.empresa._id.equals(args._id),
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Perfil)
  public async updatePerfil(@Args() { input, _id }: PerfilUpdateArgs) {
    const perfil = await this.securityService.addOrUpdate(input, _id);
    return perfil;
  }
}
