import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';

import { UsuarioService } from './usuario.service';
import { CreateOrUpdateUsuarioDto } from './usuario.dto';
import { FindOneParam } from '@/server/utils/common.dto';

@Controller('/usuario')
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
  public async updateUsuario(@Body() data: CreateOrUpdateUsuarioDto, @Param() { id }: FindOneParam) {
    return this.usuarioService.createOrUpdate(data, id);
  }

  @Delete('/:id')
  public async deleteUsuario(@Param() { id }: FindOneParam) {
    return this.usuarioService.delete(id);
  }
}
