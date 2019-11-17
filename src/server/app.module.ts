import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';

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
        useUnifiedTopology: true,
      }),
    }),
    GraphQLModule.forRoot({
      playground: !IS_PRODUCTION,
      debug: !IS_PRODUCTION,
      autoSchemaFile: './src/server/schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }: ContextType) => ({ req, res }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        transport: {
          host: config.SMTP_HOST,
          port: config.SMTP_PORT,
          auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS,
          },
        },
        defaults: {
          from: config.DEFAULT_MAIL,
        },
        template: {
          dir: config.TEMPLATES,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
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
