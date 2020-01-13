import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Rotulo } from '@/server/models/rotulo';

import { RotuloController } from './rotulo.controller';
import { RotuloService } from './rotulo.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Rotulo])],
  controllers: [RotuloController],
  providers: [RotuloService],
  exports: [RotuloService],
})
export class RotuloModule {}
