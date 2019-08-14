import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { EmpresaService } from './empresa.service';
import {
  Empresa,
  EmpresaInput,
  EmpresaArgs,
  AcaoEnum,
  RecursoEnum,
  AnyOrOwnEnum,
} from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
  PayloadType,
} from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/components/auth/auth.guard';
import { User } from '@/server/components/auth/auth.decorator';
import { UseRole } from '@/server/components/security/security.decorators';
import { SecurityGuard } from '@/server/components/security/security.guard';

@Resolver(() => Empresa)
export class EmpresaResolver {
  private readonly empresaService: EmpresaService;

  public constructor(empresaService: EmpresaService) {
    this.empresaService = empresaService;
  }

  @Query(() => [Empresa])
  public async findAllEmpresas(@Args() { skip, take }: CommonFindAllArgs) {
    const empresas = await this.empresaService.findAll(skip, take);
    return empresas;
  }

  @Query(() => Empresa)
  public async findEmpresa(@Args() { _id }: CommonFindOneArgs) {
    const empresas = await this.empresaService.findOne(_id);
    return empresas;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Empresa)
  public async addEmpresa(
    @Args('input') input: EmpresaInput,
    @User() user: PayloadType
  ) {
    const empresa = await this.empresaService.createOrUpdate(input);
    if (empresa) {
      await this.empresaService.postCreation(user, empresa);
    }
    return empresa;
  }

  @UseRole({
    acao: AcaoEnum.Atualizar,
    recurso: RecursoEnum.Empresa,
    tipo: AnyOrOwnEnum.Own,
  })
  @UseGuards(GqlAuthGuard, SecurityGuard)
  @Mutation(() => Empresa)
  public async updateEmpresa(@Args() { input, _id }: EmpresaArgs) {
    const empresa = await this.empresaService.createOrUpdate(input, _id);
    return empresa;
  }
}
