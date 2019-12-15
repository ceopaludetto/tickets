import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Module({
  imports: [DatabaseModule.forFeature([() => Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
