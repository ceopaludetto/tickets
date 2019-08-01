import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';
import { InputEmpresa } from './empresa.dto';
import { CommonFindAllArgs } from '@/server/utils/common.dto';

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
  public async findEmpresa(@Args('id') id: string) {
    const empresas = await this.empresaService.findOne(id);
    return empresas;
  }

  @Mutation(() => Empresa)
  public async addEmpresa(@Args('input') data: InputEmpresa) {
    const empresa = this.empresaService.createOrUpdate(data);
    return empresa;
  }

  @Mutation(() => Empresa)
  public async updateEmpresa(
    @Args('input')
    data: InputEmpresa,
    @Args('id')
    id: string
  ) {
    const empresa = this.empresaService.createOrUpdate(data, id);
    return empresa;
  }
}
