import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';

@Module({
  imports: [DatabaseModule.forFeature([() => Empresa])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
