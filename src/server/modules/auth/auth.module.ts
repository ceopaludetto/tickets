import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '@/server/modules/usuario/usuario.module';
import { ConfigurationService } from '@/server/modules/configuration/configuration.service';

@Module({
  imports: [
    UsuarioModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.SECRET,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
