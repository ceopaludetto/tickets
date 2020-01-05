import { Module, DynamicModule, Provider, Global } from '@nestjs/common';

import { DatabaseProvider } from './database.provider';
import { SEQUELIZE_PROVIDER } from '@/server/utils/constants';

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {
  public static forFeature(models: (() => Function)[]): DynamicModule {
    const providers = models.map(m => {
      const model = m();

      return {
        provide: `${SEQUELIZE_PROVIDER}:${model.name}`,
        useValue: model,
      } as Provider;
    });

    return {
      module: DatabaseModule,
      providers,
      exports: providers,
    };
  }
}
