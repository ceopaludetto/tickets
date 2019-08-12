import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { ConfigurationService } from '@/server/modules/configuration/configuration.service';
import { ContextType } from '@/server/utils/common.dto';
import { IS_PRODUCTION } from '@/server/utils/constants';
import { EmpresaMiddleware } from '@/server/modules/empresa/empresa.middleware';

import {
  // ReactModule,
  EmpresaModule,
  UsuarioModule,
  AuthModule,
  ConfigurationModule,
  SecurityModule,
} from '@/server/modules';

@Module({
  imports: [
    ConfigurationModule,
    TypegooseModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        uri: configService.MONGO_URI,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
    }),
    GraphQLModule.forRoot({
      playground: !IS_PRODUCTION,
      tracing: !IS_PRODUCTION,
      debug: !IS_PRODUCTION,
      autoSchemaFile: './schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }: ContextType) => ({ req, res }),
    }),
    AuthModule,
    EmpresaModule,
    UsuarioModule,
    SecurityModule,
    // ReactModule,
  ],
})
export class ApplicationModule implements NestModule {
  public configure = (consumer: MiddlewareConsumer) => {
    consumer.apply(EmpresaMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  };
}
