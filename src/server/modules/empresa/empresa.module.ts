import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/modules/database/database.module';
import { EmpresaResolver } from './empresa.resolver';
import { EmpresaService } from './empresa.service';
import { Empresa, EMPRESA_PROVIDER } from './empresa.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ model: Empresa, name: EMPRESA_PROVIDER }]),
  ],
  providers: [EmpresaResolver, EmpresaService],
})
export class EmpresaModule {}
