import { Controller, Get, Param } from '@nestjs/common';

import { FindOneParam } from '@/server/utils/common.dto';

import { PermissaoService } from './permissao.service';

@Controller('/api/permissao')
export class PermissaoController {
  public constructor(private readonly permissaoService: PermissaoService) {}

  @Get('/')
  public async findAllPermissoes() {
    return this.permissaoService.findAll();
  }

  @Get('/:id')
  public async findOnePermissao(@Param() { id }: FindOneParam) {
    return this.permissaoService.findOne(id);
  }
}
