import { Module, DynamicModule, Provider } from '@nestjs/common';

import { DatabaseProvider } from './database.provider';
import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {
  public static forFeature<T extends Function>(models: T[]): DynamicModule {
    const providers = models.map(
      m =>
        ({
          provide: `${SEQUELIZE_PROVIDER}:${((m as unknown) as Function).name}`,
          useValue: m,
        } as Provider)
    );

    return {
      module: DatabaseModule,
      providers,
      exports: providers,
    };
  }
}
