import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { EmpresaService } from './empresa.service';
import { Empresa, EmpresaInput, EmpresaArgs } from '@/server/models';
import {
  CommonFindAllArgs,
  CommonFindOneArgs,
} from '@/server/utils/common.dto';

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

  @Mutation(() => Empresa)
  public async addEmpresa(@Args('input') input: EmpresaInput) {
    const empresa = this.empresaService.createOrUpdate(input);
    return empresa;
  }

  @Mutation(() => Empresa)
  public async updateEmpresa(@Args() { input, _id }: EmpresaArgs) {
    const empresa = this.empresaService.createOrUpdate(input, _id);
    return empresa;
  }
}
