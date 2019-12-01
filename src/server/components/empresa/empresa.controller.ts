import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { FindOneParam } from '@/server/utils/common.dto';
import { CreateOrUpdateEmpresaDto } from './empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get('/')
  public async findAllEmpresas() {
    return await this.empresaService.findAll();
  }

  @Get('/:id')
  public async findOneEmpresa(@Param() { id }: FindOneParam) {
    return await this.empresaService.findOne(id);
  }

  @Post('/')
  public async createEmpresa(@Body() data: CreateOrUpdateEmpresaDto) {
    return await this.empresaService.createOrUpdate(data);
  }

  @Put('/:id')
  public async updateEmpresa(@Body() data: CreateOrUpdateEmpresaDto, @Param() { id }: FindOneParam) {
    return await this.empresaService.createOrUpdate(data, id);
  }

  @Delete('/:id')
  public async deleteEmpresa(@Param() { id }: FindOneParam) {
    return await this.empresaService.delete(id);
  }
}
