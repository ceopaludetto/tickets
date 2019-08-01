import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

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
  DatabaseModule,
} from '@/server/modules';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule.forRoot([Empresa, Funcionario]),
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
