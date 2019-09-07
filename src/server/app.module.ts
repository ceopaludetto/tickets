import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

// import { ErrorTracking } from '@/server/customs/error.tracking';
import { ContextType } from '@/server/utils/common.dto';
import { IS_PRODUCTION } from '@/server/utils/constants';

import {
  ReactModule,
  EmpresaModule,
  EmpresaMiddleware,
  UsuarioModule,
  TicketModule,
  PubSubModule,
  AuthModule,
  ConfigurationModule,
  ConfigurationService,
  SecurityModule,
} from '@/server/components';

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
      debug: !IS_PRODUCTION,
      // extensions: [() => new ErrorTracking()],
      autoSchemaFile: './src/server/schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }: ContextType) => ({ req, res }),
    }),
    AuthModule,
    EmpresaModule,
    UsuarioModule,
    TicketModule,
    PubSubModule,
    SecurityModule,
    ReactModule,
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
