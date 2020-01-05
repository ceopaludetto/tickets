import { Module } from '@nestjs/common';

import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { DatabaseModule } from '@/server/components/database';
import { Usuario } from '@/server/models/usuario';

@Module({
  imports: [DatabaseModule.forFeature([() => Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
