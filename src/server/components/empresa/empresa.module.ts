import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { EmpresaResolver } from './empresa.resolver';
import { EmpresaService } from './empresa.service';
import { Empresa } from '@/server/models';
import { EMPRESA } from '@/server/utils/constants';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Empresa,
        schemaOptions: {
          timestamps: true,
          collection: EMPRESA,
        },
      },
    ]),
  ],
  providers: [EmpresaResolver, EmpresaService],
})
export class EmpresaModule {}
