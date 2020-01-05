import { Module } from '@nestjs/common';

import { SecurityResolver } from './security.resolver';
import { SecurityService } from './security.service';
import { DatabaseModule } from '@/server/components/database';
import { UsuarioModule } from '@/server/components/usuario';
import { Politica, Perfil } from '@/server/models';
// import { UsuarioModule } from '@/server/components/usuario/usuario.module';
import { POLITICA, PERFIL } from '@/server/utils/constants';

@Module({
  providers: [SecurityResolver, SecurityService],
  imports: [
    UsuarioModule,
    DatabaseModule.forFeature([
      {
        typegooseClass: Politica,
        schemaOptions: {
          collection: POLITICA,
          timestamps: true,
        },
      },
      {
        typegooseClass: Perfil,
        schemaOptions: {
          collection: PERFIL,
          timestamps: true,
        },
      },
    ]),
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
