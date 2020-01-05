import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { PerfilService } from './perfil.service';
import { PerfilInput } from '@/server/models/perfil';
import { FindOneParam } from '@/server/utils/common.dto';

@Controller('/api/perfil')
export class PerfilController {
  public constructor(private readonly perfilService: PerfilService) {}

  @Get('/')
  public findAllPerfis() {
    return this.perfilService.findAll();
  }

  @Get('/:id')
  public findOnePerfil(@Param() { id }: FindOneParam) {
    return this.perfilService.findOne(id);
  }

  @Post('/')
  public createPerfil(@Body() data: PerfilInput) {
    return this.perfilService.createOrUpdate(data);
  }

  @Put('/:id')
  public updatePerfil(@Body() data: PerfilInput, @Param() { id }: FindOneParam) {
    return this.perfilService.createOrUpdate(data, id);
  }

  @Delete('/:id')
  public deletePerfil(@Param() { id }: FindOneParam) {
    return this.perfilService.delete(id);
  }
}
