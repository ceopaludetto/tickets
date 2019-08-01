import { Module, Global, DynamicModule } from '@nestjs/common';

import {
  generateRootProviders,
  generateFeatureProviders,
  ModelInjection,
} from './database.providers';

@Global()
@Module({})
export class DatabaseModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static forRoot(models: any[]): DynamicModule {
    const RootProviders = generateRootProviders(models);

    return {
      module: DatabaseModule,
      providers: [RootProviders],
      exports: [RootProviders],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static forFeature(models: ModelInjection[]): DynamicModule {
    const FeatureProviders = generateFeatureProviders(models);

    return {
      module: DatabaseModule,
      providers: FeatureProviders,
      exports: FeatureProviders,
    };
  }
}
