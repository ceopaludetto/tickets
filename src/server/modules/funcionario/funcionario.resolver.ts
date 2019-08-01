import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';
import { InputFuncionario } from './funcionario.dto';
import { CommonFindAllArgs } from '@/server/utils/common.dto';
import { GqlAuthGuard } from '@/server/modules/auth/auth.guard';

interface ContextType {
  req: Request;
  res: Response;
}

@Resolver(() => Funcionario)
export class FuncionarioResolver {
  private readonly funcionarioService: FuncionarioService;

  public constructor(funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService;
  }

  @Query(() => [Funcionario])
  public async findAllFuncionarios(@Args() { skip, take }: CommonFindAllArgs) {
    const funcionarios = await this.funcionarioService.findAll(skip, take);
    return funcionarios;
  }

  @Query(() => Funcionario)
  public async findFuncionario(@Args('id') id: string) {
    const funcionario = await this.funcionarioService.findOne(id);
    return funcionario;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Funcionario)
  public async profile(@Context() { req }: ContextType) {
    const funcionario = await this.funcionarioService.findOne(req.user);
    return funcionario;
  }

  @Mutation(() => Funcionario)
  public async addFuncionario(@Args('input') data: InputFuncionario) {
    const funcionario = this.funcionarioService.createOrUpdate(data);
    return funcionario;
  }

  @Mutation(() => Funcionario)
  public async updateFuncionario(
    @Args('input')
    data: InputFuncionario,
    @Args('id')
    id: string
  ) {
    const funcionario = this.funcionarioService.createOrUpdate(data, id);
    return funcionario;
  }
}
