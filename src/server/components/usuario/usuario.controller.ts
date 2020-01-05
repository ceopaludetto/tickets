import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';

import { UsuarioInput } from '@/server/models/usuario';
import { FindOneParam } from '@/server/utils/common.dto';

import { UsuarioService } from './usuario.service';

@Controller('/api/usuario')
export class UsuarioController {
  public constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/')
  public async findAllUsuarios() {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  public async findOneUsuario(@Param() { id }: FindOneParam) {
    return this.usuarioService.findOne(id);
  }

  @Put('/:id')
  public async updateUsuario(@Body() data: UsuarioInput, @Param() { id }: FindOneParam) {
    return this.usuarioService.createOrUpdate(data, id);
  }

  @Delete('/:id')
  public async deleteUsuario(@Param() { id }: FindOneParam) {
    return this.usuarioService.delete(id);
  }
}
