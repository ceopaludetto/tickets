import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { FuncionarioModule } from '@/server/modules/funcionario/funcionario.module';
import { ConfigurationService } from '@/server/modules/configuration/configuration.service';

@Module({
  imports: [
    FuncionarioModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.SECRET,
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
