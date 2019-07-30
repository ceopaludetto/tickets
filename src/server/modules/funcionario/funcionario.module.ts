import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuncionarioResolver } from './funcionario.resolver';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  providers: [FuncionarioResolver, FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
