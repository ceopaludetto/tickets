import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { ReactController } from './react.controller';
import { ReactService } from './react.service';
import { AuthMiddleware, AuthModule } from '@/server/components/authentication';
import { UsuarioModule } from '@/server/components/usuario';

@Module({
  imports: [AuthModule, UsuarioModule],
  controllers: [ReactController],
  providers: [ReactService],
})
export class ReactModule implements NestModule {
  public configure = (consumer: MiddlewareConsumer) => {
    consumer.apply(AuthMiddleware).forRoutes('*');
  };
}
