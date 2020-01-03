import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';

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
