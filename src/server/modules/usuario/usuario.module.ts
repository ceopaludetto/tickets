import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// import { DatabaseModule } from '@/server/modules/database/database.module';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypegooseModule.forFeature([Usuario])],
  providers: [UsuarioResolver, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
