import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/modules/database/database.module';
import { FuncionarioResolver } from './funcionario.resolver';
import { FuncionarioService } from './funcionario.service';
import { Funcionario, FUNCIONARIO_PROVIDER } from './funcionario.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { model: Funcionario, name: FUNCIONARIO_PROVIDER },
    ]),
  ],
  providers: [FuncionarioResolver, FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
