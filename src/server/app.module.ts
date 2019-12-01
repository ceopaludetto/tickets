import { Module } from '@nestjs/common';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { setGlobalOptions } from '@typegoose/typegoose';

import {
  // ReactModule,
  AuthModule,
  ConfigurationModule,
  ConfigurationService,
  // SecurityModule,
  DatabaseModule,
  UsuarioModule,
  EmpresaModule,
} from '@/server/components';

setGlobalOptions({ globalOptions: { useNewEnum: true } });

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    MailerModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: ({ email: { host, port, user, pass }, templates }: ConfigurationService) => ({
        transport: {
          host,
          port,
          auth: {
            user,
            pass,
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
    // SecurityModule
    // ReactModule,
  ],
})
export class ApplicationModule {}
