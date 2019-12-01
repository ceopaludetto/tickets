import { Module, Global, DynamicModule, Provider } from '@nestjs/common';

import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';
import { DatabaseProvider } from './database.provider';

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {
  public static forFeature<T>(models: T[]): DynamicModule {
    const sequelizeProviders: Provider[] = models.map(m => {
      return {
        provide: `${SEQUELIZE_PROVIDER}:${((m as unknown) as new () => T).name}`,
        useValue: m,
      } as Provider;
    });

    return {
      module: DatabaseModule,
      providers: sequelizeProviders,
      exports: sequelizeProviders,
    };
  }
}
