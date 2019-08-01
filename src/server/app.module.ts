import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContextType } from '@/server/utils/common.dto';
import { IS_PRODUCTION } from '@/server/utils/constants';

import {
  // ReactModule,
  EmpresaModule,
  Empresa,
  Funcionario,
  FuncionarioModule,
  AuthModule,
  ConfigurationModule,
  ConfigurationService,
} from '@/server/modules';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        port: configService.PORT,
        type: 'postgres',
        host: configService.HOST,
        username: configService.USERNAME,
        password: configService.PASSWORD,
        database: configService.DATABASE,
        entities: [Empresa, Funcionario],
        synchronize: !IS_PRODUCTION,
        keepConnectionAlive: !IS_PRODUCTION,
        uuidExtension: 'pgcrypto',
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
    FuncionarioModule,
    // ReactModule,
  ],
})
export class ApplicationModule {}
