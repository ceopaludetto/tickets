import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// import { DatabaseModule } from '@/server/modules/database/database.module';
import { FuncionarioResolver } from './funcionario.resolver';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Module({
  imports: [TypegooseModule.forFeature([Funcionario])],
  providers: [FuncionarioResolver, FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
