import { Controller, Get, Param } from '@nestjs/common';

import { FindOneParam } from '@/server/utils/common.dto';

import { RotuloService } from './rotulo.service';

@Controller('/api/rotulo')
export class RotuloController {
  public constructor(private readonly rotuloService: RotuloService) {}

  @Get('/')
  public async findAllRotulos() {
    return this.rotuloService.findAll();
  }

  @Get('/:id')
  public async findOneRotulo(@Param() { id }: FindOneParam) {
    return this.rotuloService.findOne(id);
  }
}
