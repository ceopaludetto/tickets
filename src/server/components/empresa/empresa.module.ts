import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Empresa } from '@/server/models/empresa';

import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Empresa])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
