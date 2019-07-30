import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContextType } from '@/server/utils/common.dto';

import {
  ReactModule,
  EmpresaModule,
  Empresa,
  Funcionario,
  FuncionarioModule,
  AuthModule,
  ConfigurationModule,
  ConfigurationService,
} from '@/server/modules';

const isProd = process.env.NODE_ENV === 'production' || false;

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        port: configService.PORT,
        type: 'postgres',
        host: configService.HOST,
        username: configService.USERNAME,
        password: configService.PASSWORD,
        database: configService.DATABASE,
        entities: [Empresa, Funcionario],
        synchronize: !isProd,
        keepConnectionAlive: !isProd,
      }),
    }),
    GraphQLModule.forRoot({
      playground: !isProd,
      tracing: false,
      debug: false,
      autoSchemaFile: './schema.gql',
      context: ({ req, res }: ContextType) => ({ req, res }),
    }),
    AuthModule,
    EmpresaModule,
    FuncionarioModule,
    ReactModule,
  ],
})
export class ApplicationModule {}
