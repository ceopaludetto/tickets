import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';
import { Usuario, Associacao } from '@/server/models';
import { USUARIO, ASSOCIACAO } from '@/server/utils/constants';

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Usuario,
        schemaOptions: {
          timestamps: true,
          collection: USUARIO,
        },
      },
      {
        typegooseClass: Associacao,
        schemaOptions: {
          timestamps: true,
          collection: ASSOCIACAO,
        },
      },
    ]),
  ],
  providers: [UsuarioResolver, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
