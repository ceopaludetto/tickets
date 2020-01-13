import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/server/components/database';
import { Permissao } from '@/server/models/permissao';

import { PermissaoController } from './permissao.controller';
import { PermissaoService } from './permissao.service';

@Module({
  imports: [DatabaseModule.forFeature([() => Permissao])],
  controllers: [PermissaoController],
  providers: [PermissaoService],
  exports: [PermissaoService],
})
export class PermissaoModule {}
