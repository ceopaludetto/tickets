import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { AccessControlModule } from 'nest-access-control';

import { Roles } from '@/server/modules/auth/auth.roles';
import { ConfigurationService } from '@/server/modules/configuration/configuration.service';
import { ContextType } from '@/server/utils/common.dto';
import { IS_PRODUCTION } from '@/server/utils/constants';

import {
  // ReactModule,
  EmpresaModule,
  UsuarioModule,
  AuthModule,
  ConfigurationModule,
} from '@/server/modules';

@Module({
  imports: [
    ConfigurationModule,
    AccessControlModule.forRoles(Roles),
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
    // ReactModule,
  ],
})
export class ApplicationModule {}
