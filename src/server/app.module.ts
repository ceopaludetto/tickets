import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import {
  ReactModule,
  AuthModule,
  ConfigurationModule,
  ConfigurationService,
  // SecurityModule,
  DatabaseModule,
  UsuarioModule,
  EmpresaModule,
  TicketModule,
  PerfilModule,
  LabelModule,
} from '@/server/components';

@Module({
  imports: [
    LoggerModule.forRoot({
      name: 'F3Desk',
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      prettyPrint:
        process.env.NODE_ENV !== 'production'
          ? {
              translateTime: 'dd/mm/yyyy, h:MM:ss:l',
              ignore: 'context,pid',
              levelFirst: true,
            }
          : false,
      useLevelLabels: true,
    }),
    ConfigurationModule,
    DatabaseModule,
    MailerModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: ({ email: { host, port, username, password }, templates }: ConfigurationService) => ({
        transport: {
          host,
          port,
          auth: {
            user: username,
            pass: password,
          },
        },
        template: {
          dir: templates,
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
    LabelModule,
    PerfilModule,
    // SecurityModule
    ReactModule,
  ],
})
export class ApplicationModule {}
