import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/modules/database/database.module';
import { EmpresaResolver } from './empresa.resolver';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';

@Module({
  imports: [DatabaseModule.forFeature([Empresa])],
  providers: [EmpresaResolver, EmpresaService],
})
export class EmpresaModule {}
