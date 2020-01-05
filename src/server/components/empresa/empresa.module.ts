import { Module } from '@nestjs/common';

import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { DatabaseModule } from '@/server/components/database';
import { Empresa } from '@/server/models/empresa';

@Module({
  imports: [DatabaseModule.forFeature([() => Empresa])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
