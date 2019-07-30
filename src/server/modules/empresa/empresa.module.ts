import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresaResolver } from './empresa.resolver';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresaResolver, EmpresaService],
})
export class EmpresaModule {}
