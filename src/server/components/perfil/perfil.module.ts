import { Module } from '@nestjs/common';

import { Perfil } from './perfil.entity';
import { Politica } from './politica.entity';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { DatabaseModule } from '@/server/components/database';

@Module({
  imports: [DatabaseModule.forFeature([() => Perfil, () => Politica])],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
