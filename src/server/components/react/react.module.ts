import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { ReactController } from './react.controller';
import { ReactService } from './react.service';
import { SchemaModule } from '../schema/schema.module';
import { AuthModule } from '@/server/components/auth/auth.module';
import { AuthMiddleware } from '@/server/components/auth/auth.middleware';

@Module({
  imports: [SchemaModule, AuthModule],
  controllers: [ReactController],
  providers: [ReactService],
})
export class ReactModule implements NestModule {
  public configure = (consumer: MiddlewareConsumer) => {
    consumer.apply(AuthMiddleware).forRoutes('*');
  };
}
