import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { SecurityService } from './security.service';
import { SecurityResolver } from './security.resolver';
import { Politica, Perfil } from '@/server/models';
import { UsuarioModule } from '@/server/modules/usuario/usuario.module';

@Module({
  providers: [SecurityResolver, SecurityService],
  imports: [
    UsuarioModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: Politica,
        schemaOptions: {
          timestamps: true,
        },
      },
      {
        typegooseClass: Perfil,
        schemaOptions: {
          timestamps: true,
        },
      },
    ]),
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
