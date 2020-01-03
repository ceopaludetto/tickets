import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from '@/server/components/auth/auth.guard';
import { Perfil, PerfilInput, PerfilUpdateArgs, AcaoEnum, RecursoEnum, AnyOrOwnEnum, Empresa } from '@/server/models';
import { CommonFindAllArgs, CommonFindOneArgs } from '@/server/utils/common.dto';

import { UseRole } from './security.decorators';
import { SecurityGuard } from './security.guard';
import { SecurityService } from './security.service';

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
    tipo: AnyOrOwnEnum.Own,
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
    tipo: AnyOrOwnEnum.Any,
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
    tipo: AnyOrOwnEnum.Any,
    customMatcher: (user, args, assoc) => (assoc.empresa as Empresa)._id === args._id,
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Perfil)
  public async updatePerfil(@Args() { input, _id }: PerfilUpdateArgs) {
    const perfil = await this.securityService.addOrUpdate(input, _id);
    return perfil;
  }
}
