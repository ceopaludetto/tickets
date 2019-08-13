import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {
  Perfil,
  PerfilInput,
  PerfilUpdateArgs,
  AcaoEnum,
  RecursoEnum,
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

  @Query(() => Perfil)
  public async findPerfil(@Args() { _id }: CommonFindOneArgs) {
    const perfil = await this.securityService.findOne(_id);
    return perfil;
  }

  // @UseGuards(GqlAuthGuard, SecurityGuard)
  // @UseRole({
  //   acao: AcaoEnum.Ler,
  //   recurso: RecursoEnum.Perfil,
  // })
  @Mutation(() => Perfil)
  public async addPerfil(@Args('input') input: PerfilInput) {
    const perfil = await this.securityService.addOrUpdate(input);
    return perfil;
  }

  @Mutation(() => Perfil)
  public async updatePerfil(@Args() { input, _id }: PerfilUpdateArgs) {
    const perfil = await this.securityService.addOrUpdate(input, _id);
    return perfil;
  }
}
