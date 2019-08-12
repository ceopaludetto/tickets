import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// import { DatabaseModule } from '@/server/modules/database/database.module';
import { UsuarioResolver } from './usuario.resolver';
import { UsuarioService } from './usuario.service';
import { Usuario, Associacao } from '@/server/models';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Usuario,
        schemaOptions: {
          timestamps: true,
        },
      },
      {
        typegooseClass: Associacao,
        schemaOptions: {
          timestamps: true,
        },
      },
    ]),
  ],
  providers: [UsuarioResolver, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
