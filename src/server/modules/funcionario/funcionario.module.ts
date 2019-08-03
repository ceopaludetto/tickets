import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/modules/database/database.module';
import { FuncionarioResolver } from './funcionario.resolver';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Module({
  imports: [DatabaseModule.forFeature([Funcionario])],
  providers: [FuncionarioResolver, FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
