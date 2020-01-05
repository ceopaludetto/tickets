import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Perfil } from '@/server/models/perfil';
import { Politica } from '@/server/models/politica';

import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Perfil, () => Politica])],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
